import { FlatOption } from "../src/types";
import { collapseOptions, expandOptions, flattenOptions } from "../src/utils";

describe("Utils tests", () => {
    const dummyOptions = [
        {
            id: "id1",
            label: "parent1",
            children: [
                {
                    id: "id1_1",
                    label: "child1",
                    children: [
                        {
                            id: "id_1_1",
                            label: "grandchild1"
                        }
                    ]
                }
            ]
        },
        {
            id: "id2",
            label: "parent2"
        }
    ];

    const flatOptions = [
        {
            id: 'id1',
            label: 'parent1',
            path: ['id1'],
            show: true,
            hasChildren: true,
            open: false
        },
        {
            id: 'id1_1',
            label: 'child1',
            path: ['id1', 'id1_1'],
            show: false,
            hasChildren: true,
            open: false
        },
        {
            id: 'id_1_1',
            label: 'grandchild1',
            path: ['id1', 'id1_1', 'id_1_1'],
            show: false,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: ['id2'],
            show: true,
            hasChildren: false
        }
    ] as FlatOption[];

    const flatOptionsExpanded = [
        {
            id: 'id1',
            label: 'parent1',
            path: ['id1'],
            show: true,
            hasChildren: true,
            open: true
        },
        {
            id: 'id1_1',
            label: 'child1',
            path: ['id1', 'id1_1'],
            show: true,
            hasChildren: true,
            open: true
        },
        {
            id: 'id_1_1',
            label: 'grandchild1',
            path: ['id1', 'id1_1', 'id_1_1'],
            show: true,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: ['id2'],
            show: true,
            hasChildren: false
        }
    ] as FlatOption[];

    it("flattens options", () => {
        const array = [];
        flattenOptions(array, dummyOptions);
        expect(array).toStrictEqual(flatOptions);
    });

    it("expands options", () => {
        // need to create a deep copy since we are mutating elements
        const array = JSON.parse(JSON.stringify(flatOptions));
        expandOptions(array, ["id1", "id1_1"]);
        const openedOption = array.find(op => op.id === "id_1_1");
        expect(openedOption?.show).toBe(true);
    });

    it("collapses options", () => {
        const array = JSON.parse(JSON.stringify(flatOptionsExpanded));
        collapseOptions(array, ["id1"]);
        array.forEach(op => {
            if (op.id === "id1" || op.id === "id2") {
                expect(op.show).toBe(true);
            } else {
                expect(op.show).toBe(false);
            }
        });
    });
});