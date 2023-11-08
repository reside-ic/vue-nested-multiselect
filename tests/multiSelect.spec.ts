import { mount } from "@vue/test-utils";
import MultiSelect from "../src/components/MultiSelect.vue";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
import DropdownItem from "../src/components/DropdownItem.vue";
import { vi } from "vitest";
import Tags from "../src/components/Tags.vue";

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

describe("Dropdown item tests", () => {
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
                    label: "child2"
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
    ]

    afterEach(() => {
        vi.resetAllMocks();
    });

    const getWrapper = (id: string[] | undefined = undefined, placeholder = undefined) => {
        return mount(MultiSelect, {
            props: {
                options,
                placeholder,
                modelValue: id
            }
        });
    };

    it("renders as expected", async () => {
        const wrapper = getWrapper();

        const cDropdown = wrapper.findComponent(CDropdown);
        expect(cDropdown.props("autoClose")).toBe("outside");
        expect(cDropdown.props("popper")).toBe(false);
        expect(cDropdown.classes()).toContain("dropdown");

        const cDropdownToggle = wrapper.findComponent(CDropdownToggle);
        expect(cDropdownToggle.find("span").text()).toBe("Select...");
        expect(cDropdownToggle.find("span").classes()).toContain("placeholder-span");

        expect(cDropdownToggle.findComponent(Tags).exists()).toBe(false);

        const cDropdownMenu = wrapper.findComponent(CDropdownMenu);
        expect(cDropdownMenu.exists());
        expect(cDropdownMenu.classes()).toContain("menu");

        const cDropdownItems = wrapper.findAllComponents(CDropdownItem);
        expect(cDropdownItems.every((item, index) => index === 1 || index === 2 ?
                                                     !item.isVisible() :
                                                     item.isVisible()));
        expect(cDropdownItems.every(item => expect(item.classes()).toContain("item")));

        const dropdownItem = wrapper.findAllComponents(DropdownItem);
        dropdownItem.forEach((item, index) => {
            expect(item.props("option")).toStrictEqual(flatOptions[index]);
        });
    });

    it("sets tags as expected", () => {
        const wrapper = getWrapper(["id1"]);
        const tag = wrapper.findComponent(Tags);
        expect(tag.props("tags")).toStrictEqual([
            {
                id: "id1",
                label: "parent1"
            }
        ])
    });

    it("expand works as expected with dropdown item emits expand", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("expand", "/id1");
        expect(wrapper.vm.flatOptions[1].show).toBe(true);
        expect(wrapper.vm.flatOptions[2].show).toBe(true);
    });

    it("collapse works as expected", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("expand", "/id1");
        expect(wrapper.vm.flatOptions[1].show).toBe(true);
        expect(wrapper.vm.flatOptions[2].show).toBe(true);

        dropdownItems[0].vm.$emit("collapse", "/id1");
        expect(wrapper.vm.flatOptions[1].show).toBe(false);
        expect(wrapper.vm.flatOptions[2].show).toBe(false);
    });

    it("handleSelectItem works as expected", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("select-item", "id1_1");
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(["id1_1"]);
    });

    it("preventDefault prevents default", () => {
        const wrapper = getWrapper();
        wrapper.vm.preventDefault({ preventDefault: mockPreventDefault } as any);
        expect(mockPreventDefault.mock.calls.length).toBe(1);
    });
});