import { mount } from "@vue/test-utils";
import MultiSelect from "../src/components/MultiSelect.vue";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
import DropdownItem from "../src/components/DropdownItem.vue";
import { vi } from "vitest";
import Tags from "../src/components/Tags.vue";
import { CheckStatus } from "../src/types";
import BaseSelect from "../src/components/BaseSelect.vue";

vi.mock("../src/components/utils", async () => {
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
            hasChildren: false
        },
        {
            id: 'id1_2',
            label: 'child2',
            path: ['id1', 'id1_2'],
            show: true,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: ['id2'],
            show: true,
            hasChildren: false
        },
    ];

    const flatOptionsCollapsed = [
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
            hasChildren: false
        },
        {
            id: 'id1_2',
            label: 'child2',
            path: ['id1', 'id1_2'],
            show: false,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: ['id2'],
            show: true,
            hasChildren: false
        },
    ];

    const actual = await vi.importActual("../src/components/utils") as any;
    return {
        ...actual,
        expandOptions: () => flatOptionsExpanded,
        collapseOptions: () => flatOptionsCollapsed
    }
});

const mockPreventDefault = vi.fn();

describe("Multi select tests", () => {
    const options = [
        {
            id: "id1",
            label: "parent1",
            children: [
                {
                    id: "id1_1",
                    label: "child1"
                },
                {
                    id: "id1_2",
                    label: "child2",
                    children: [
                        {
                            id: "id1_2_1",
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

    const checkedObject = {
        "id1": CheckStatus.UNCHECKED,
        "id1/id1_1": CheckStatus.UNCHECKED,
        "id1/id1_2": CheckStatus.UNCHECKED,
        "id1/id1_2/id1_2_1": CheckStatus.UNCHECKED,
        "id2": CheckStatus.UNCHECKED
    }

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
            hasChildren: false
        },
        {
            id: 'id1_2',
            label: 'child2',
            path: ['id1', 'id1_2'],
            show: false,
            hasChildren: true,
            open: false
        },
        {
            id: 'id1_2_1',
            label: 'grandchild1',
            path: ['id1', 'id1_2', 'id1_2_1'],
            show: false,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: ['id2'],
            show: true,
            hasChildren: false
        },
    ]

    afterEach(() => {
        vi.resetAllMocks();
    });

    const getWrapper = (ids: string[] | undefined = undefined, placeholder = undefined) => {
        return mount(MultiSelect, {
            props: {
                options,
                placeholder,
                modelValue: ids
            }
        });
    };

    it("renders as expected", async () => {
        const wrapper = getWrapper();

        const baseSelect = wrapper.findComponent(BaseSelect);
        expect(baseSelect.props("options")).toStrictEqual(options);
        expect(baseSelect.props("checkedObject")).toStrictEqual(checkedObject);

        const placeholder = wrapper.find(".placeholder-span");
        expect(placeholder.text()).toBe("Select...");
    });

    it("sets top level tags as expected", () => {
        const wrapper = getWrapper(["id1_1", "id1_2"]);
        const tag = wrapper.findComponent(Tags);
        expect(tag.props("tags")).toStrictEqual([
            {
                id: "id1",
                label: "parent1"
            }
        ])
    });

    it("gets checked object as expected", () => {
        const wrapper = getWrapper(["id2", "id1_2_1"]);
        expect(wrapper.vm.checkedObject).toStrictEqual({
            "id1": CheckStatus.PARTIAL,
            "id1/id1_1": CheckStatus.UNCHECKED,
            "id1/id1_2": CheckStatus.CHECKED,
            "id1/id1_2/id1_2_1": CheckStatus.CHECKED,
            "id2": CheckStatus.CHECKED
        });
    });

    /*
    4 cases to test for handle select item:
        1. option has children and it is (partially) checked
        2. option has children and it is unchecked
        3. no children and checked
        4. children and unchecked
    */
    it("handleSelectItem works as expected in case 1", () => {
        const wrapper = getWrapper(["id1", "id1_1", "id1_2", "id1_2_1"]);
        const dropdownItem = wrapper.findComponent(DropdownItem);
        // doesnt actually matter which one we emit from so
        // pretend this is dropdown item for id1_2 
        dropdownItem.vm.$emit("select-item", "id1_2");

        // should remove its child and parent
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(["id1_1"]);
    });

    it("handleSelectItem works as expected in case 2", () => {
        const wrapper = getWrapper();
        const dropdownItem = wrapper.findComponent(DropdownItem);
        dropdownItem.vm.$emit("select-item", "id1");
        // all children should be selected
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(["id1", "id1_1", "id1_2", "id1_2_1"]);
    });

    it("handleSelectItem works as expected in case 3", () => {
        const wrapper = getWrapper(["id2", "id1_2_1"]);
        const dropdownItem = wrapper.findComponent(DropdownItem);
        dropdownItem.vm.$emit("select-item", "id2");
        // uncheck the option
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(["id1_2_1"]);
    });

    it("handleSelectItem works as expected in case 4", () => {
        const wrapper = getWrapper(["id1_2_1"]);
        const dropdownItem = wrapper.findComponent(DropdownItem);
        dropdownItem.vm.$emit("select-item", "id2");
        // check the option
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(["id1_2_1", "id2"]);
    });
});