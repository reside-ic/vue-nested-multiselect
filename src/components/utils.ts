import { FlatOption, Option } from "./types";

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
