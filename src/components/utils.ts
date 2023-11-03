import { FlatOption, Option } from "./types";

export const flattenOptions = (array: FlatOption[], options: Option[], path: string = "") => {
    options.forEach(op => {
        const hasChildren = op.hasOwnProperty("children");
        const newPath = `${path}/${op.id}`;
        const isTopLevel = path.split("/").length === 1;

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
            array.push({...baseOption, hasChildren})
        }
    });
};

export const expandOptions = (array: FlatOption[], optionPath: string): FlatOption[] => {
    const openOptions: string[] = [optionPath];
    return array.map(op => {
        if (op.path === optionPath) {
          return { ...op, open: true }
        }

        const opPath = op.path.split("/");

        // if you are a child of a previously opened option then you should show
        const show = openOptions.some(openOp => {
          const openPath = openOp.split("/");
          return openPath.length === opPath.length - 1 &&
                 openPath.join("/") === opPath.slice(0, -1).join("/")
        })

        if (op.hasChildren && op.open) {
          openOptions.push(op.path)
        }

        if (show) {
          return { ...op, show }
        }
        return op
    });
};

export const collapseOptions = (array: FlatOption[], optionPath: string) => {
    const path = optionPath.split("/");
    return array.map(op => {
        if (op.path === optionPath) {
          return { ...op, open: false }
        }

        // if you are any number of layer under the option you should not show
        const opPath = op.path.split("/");
        if (path.join("/") === opPath.slice(0, path.length).join("/")) {
          return { ...op, show: false }
        }
        return op
    });
};