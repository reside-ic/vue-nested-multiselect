import { FlatOption, Option } from "./types";

export const getFlattenedOptions = (options: Option[]) => {
    const flatOptions: FlatOption[] = [];
    flattenOptions(flatOptions, options)
    return flatOptions;
};

export const flattenOptions = (array: FlatOption[], options: Option[], path: string[] = [], show: boolean = true) => {
    options.forEach(op => {
        const hasChildren = !!(op.hasOwnProperty("children") && op.children && op.children.length > 0);
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
