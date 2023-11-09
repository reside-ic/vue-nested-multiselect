import { FlatOption, Option, CheckStatus, CheckObject, Tag } from "./types";

export const getFlattenedOptions = (options: Option[]) => {
    const flatOptions: FlatOption[] = [];
    flattenOptions(flatOptions, options)
    return flatOptions;
};

export const flattenOptions = (array: FlatOption[], options: Option[], path: string[] = [], show: boolean = true) => {
    options.forEach(op => {
        const hasChildren = op.hasOwnProperty("children");
        const newPath = [...path, op.id];

        const baseOption = {
            id: op.id,
            label: op.label,
            path: newPath,
            show
        };

        if (hasChildren) {
            array.push({...baseOption, hasChildren, open: false});
            flattenOptions(array, op.children!, newPath, false);
        } else {
            array.push({...baseOption, hasChildren});
        }
    });
};

const arraysAreEqual = (array1: string[], array2: string[]) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

export const expandOptions = (array: FlatOption[], optionPath: string[]) => {
    const openOptionsPaths: string[][] = [optionPath];
    let index = array.findIndex(op => arraysAreEqual(op.path, optionPath));

    const currentOption = array[index];
    if (currentOption.hasChildren) {
        currentOption.open = true;
    }
    index++;

    while (index < array.length && array[index].path.length > optionPath.length) {
        const currentOption = array[index];
        const show = openOptionsPaths.some(openOpPath => {
            return openOpPath.length === array[index].path.length - 1 &&
                   arraysAreEqual(openOpPath, array[index].path.slice(0, -1));
        });
        currentOption.show = show;

        if (currentOption.hasChildren && currentOption.open) {
            openOptionsPaths.push(currentOption.path);
        }

        index++;
    }
};

export const collapseOptions = (array: FlatOption[], optionPath: string[]) => {
    let index = array.findIndex(op => arraysAreEqual(op.path, optionPath));

    const currentOption = array[index];
    if (currentOption.hasChildren) {
        currentOption.open = false;
    }
    index++;

    while (index < array.length && array[index].path.length > optionPath.length) {
        array[index].show = false;
        index++;
    };
};

export const getNestedChildrenIds = (flatOptions: FlatOption[], ids: string[]) => {
    const childrenIds: string[] = [...ids];
    const parentOptions: [FlatOption, number][] = ids.map(id => {
        const index = flatOptions.findIndex(op => op.id === id);
        // we can start at the next index since we are already copying
        // ids into childrenIds
        return [flatOptions[index], index + 1];
    });

    parentOptions.forEach(([parentOp, index]) => {
        let currentIndex = index;
        while (currentIndex < flatOptions.length && flatOptions[currentIndex].path.length > parentOp.path.length) {
            const currentId = flatOptions[currentIndex].id;
            if (!childrenIds.includes(currentId)) {
                childrenIds.push(currentId);
            }
            currentIndex++;
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

export const getCheckedObject = (flatOptions: FlatOption[], checkedValues: string[]): CheckObject => {
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
