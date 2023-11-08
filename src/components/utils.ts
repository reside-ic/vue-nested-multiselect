import { CheckObject, CheckStatus, FlatOption, Option, Tag } from "./types";

export const flattenOptions = (array: FlatOption[], options: Option[], path: string[] = []) => {
    options.forEach(op => {
        const hasChildren = op.hasOwnProperty("children");
        const newPath = [...path, op.id];
        const isTopLevel = newPath.length === 1;

        const baseOption = {
            id: op.id,
            label: op.label,
            path: newPath,
            show: isTopLevel
        };

        if (hasChildren) {
            array.push({...baseOption, hasChildren, open: false});
            flattenOptions(array, op.children!, newPath);
        } else {
            array.push({...baseOption, hasChildren});
        }
    });
};

const arraysAreEqual = (array1: string[], array2: string[]) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

export const expandOptions = (array: FlatOption[], optionPath: string[]): FlatOption[] => {
    const openOptionsPaths: string[][] = [optionPath];
    return array.map(op => {
        if (arraysAreEqual(op.path, optionPath)) {
            return { ...op, open: true };
        }

        // if you are a child of a previously opened option then you should show
        const show = openOptionsPaths.some(openOpPath => {
            return openOpPath.length === op.path.length - 1 &&
                   arraysAreEqual(openOpPath, op.path.slice(0, -1));
        });

        if (op.hasChildren && op.open) {
            openOptionsPaths.push(op.path);
        }

        if (show) {
            return { ...op, show };
        }
        return op;
    });
};

export const collapseOptions = (array: FlatOption[], optionPath: string[]) => {
    return array.map(op => {
        if (arraysAreEqual(op.path, optionPath)) {
            return { ...op, open: false };
        }

        // if you are any number of layer under the option you should not show
        if (arraysAreEqual(optionPath, op.path.slice(0, optionPath.length))) {
            return { ...op, show: false };
        }
        return op;
    });
};

export const getAllNestedChildrenIds = (flatOptions: FlatOption[], ids: string[]) => {
    const childrenIds: string[] = [];
    const parentOptions = ids.map(id => {
        return flatOptions.find(op => op.id === id)!
    });

    flatOptions.forEach(op => {
        if (ids.includes(op.id)) {
            childrenIds.push(op.id);
            return
        }

        // an option is a nested child if a parent option's path
        // is a prefix of its path
        const isNestedChild = parentOptions.some(parentOp => {
            return arraysAreEqual(parentOp.path, op.path.slice(0, parentOp.path.length));
        });

        if (isNestedChild) {
            childrenIds.push(op.id);
        }
    });
    return childrenIds;
};

type ChildCheckedInfo = {
    checked: number,
    unchecked: number,
    partial: number
}

type ChildCheckedRecord = Record<string, ChildCheckedInfo>


const recordChildStatus = (parentId: string | undefined, record: ChildCheckedRecord, status: CheckStatus) => {
    if (parentId) {
        if (status === CheckStatus.CHECKED) {
            record[parentId].checked++;
        } else if (status === CheckStatus.UNCHECKED) {
            record[parentId].unchecked++;
        } else if (status === CheckStatus.PARTIAL) {
            record[parentId].partial++;
        }
    }
};

export const createCheckedObject = (flatOptions: FlatOption[], checkedValues: string[]): CheckObject => {
    const checkedObject: CheckObject = {};
    flatOptions.forEach(op => {
        checkedObject[op.path.join("/")] = CheckStatus.UNCHECKED;
    });

    // create array of deepest to root node
    const revOptions = flatOptions.slice();
    revOptions.sort((op1, op2) => {
        return op1.path.length > op2.path.length ? -1 : 1
    });

    // We will record how many immediate children as checked, unchecked or partial
    // for each parent that has children. We are guaranteed to check all children
    // since we are going from deepest to root node
    const childCheckedRecord: ChildCheckedRecord = {};
    revOptions.forEach(op => {
        if (op.hasChildren) {
            childCheckedRecord[op.id] = {
                checked: 0,
                unchecked: 0,
                partial: 0
            }
        }
    });

    // we traverse the tree while both setting check status for children
    // and recording their status for their immediate parent
    revOptions.forEach(op => {
        let status;
        const parentId = op.path.at(-2)
        if (!op.hasChildren) {
            if (checkedValues.includes(op.id)) {
                status = CheckStatus.CHECKED;
            } else {
                status = CheckStatus.UNCHECKED;
            }
        } else {
            const childRecord = childCheckedRecord[op.id];
            if (childRecord.checked === 0 && childRecord.partial === 0) {
                status = CheckStatus.UNCHECKED
            } else if (childRecord.unchecked === 0 && childRecord.partial === 0) {
                status = CheckStatus.CHECKED
            } else {
                status = CheckStatus.PARTIAL
            }
        }
        recordChildStatus(parentId, childCheckedRecord, status);
        checkedObject[op.path.join("/")] = status;
    });
    return checkedObject;
};

export const getTopLevelOptionTags = (
    selectedTags: FlatOption[],
    flatOptions: FlatOption[],
    checkedObject: CheckObject
): Tag[] => {
    const topLevelOptionTags: Tag[] = [];
    const lowLevelOptionIds: string[] = [];
    selectedTags.forEach(op => {
        if (lowLevelOptionIds.includes(op.id)) {
            return;
        }
        const parentIds = op.path;

        // we loop from the highest parent's id in this option's path
        // to the lowest which is itself's id in its path and break
        // when we find the first id that is checked
        
        // we store the rest of the lower ids in the lowLevelOptionIds
        // because we already have a higher level tag that is checked
        // so we do not care about any of its nested children
        for (let i = 0; i < parentIds.length; i++) {
            const parentOp = flatOptions.find(op => op.id === parentIds[i])!;
            if (checkedObject[parentOp.path.join("/")] === CheckStatus.CHECKED) {
                if (!topLevelOptionTags.map(tag => tag.id).includes(parentOp.id)) {
                    topLevelOptionTags.push({
                        id: parentOp.id,
                        label: parentOp.label
                    });
                }
                lowLevelOptionIds.push(...parentIds.slice(i + 1))
                break;
            }
        }
    });
    return topLevelOptionTags
};
