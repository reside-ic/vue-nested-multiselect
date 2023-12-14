export type Option = {
    id: string,
    label: string,
    children?: Option[]
}

export type FlatOption = {
    id: string,
    label: string,
    hasChildren: false,
    path: string[],
    show: boolean
} | {
    id: string,
    label: string,
    hasChildren: true,
    path: string[],
    show: boolean,
    open: boolean
}

export enum CheckStatus {
    CHECKED, UNCHECKED, PARTIAL
}
