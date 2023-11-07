import { mount } from "@vue/test-utils";
import SingleSelect from "../src/components/SingleSelect.vue";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
import DropdownItem from "../src/components/DropdownItem.vue";
import { vi } from "vitest";

vi.mock("../src/components/utils", async () => {
    const flatOptionsExpanded = [
        {
            id: 'id1',
            label: 'parent1',
            path: '/id1',
            show: true,
            hasChildren: true,
            open: true
        },
        {
            id: 'id1_1',
            label: 'child1',
            path: '/id1/id1_1',
            show: true,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: '/id2',
            show: true,
            hasChildren: false
        },
    ]

    const flatOptionsCollapsed = [
        {
            id: 'id1',
            label: 'parent1',
            path: '/id1',
            show: true,
            hasChildren: true,
            open: false
        },
        {
            id: 'id1_1',
            label: 'child1',
            path: '/id1/id1_1',
            show: false,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: '/id2',
            show: true,
            hasChildren: false
        },
    ]

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
            path: '/id1',
            show: true,
            hasChildren: true,
            open: false
        },
        {
            id: 'id1_1',
            label: 'child1',
            path: '/id1/id1_1',
            show: false,
            hasChildren: false
        },
        {
            id: 'id2',
            label: 'parent2',
            path: '/id2',
            show: true,
            hasChildren: false
        },
    ]

    afterEach(() => {
        vi.resetAllMocks();
    });

    const getWrapper = (id: string | undefined = undefined, placeholder = undefined) => {
        return mount(SingleSelect, {
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
        expect(cDropdownToggle.find("span").classes()).toContain("label");

        const cDropdownMenu = wrapper.findComponent(CDropdownMenu);
        expect(cDropdownMenu.exists()).toBe(true);
        expect(cDropdownMenu.classes()).toContain("menu");

        const cDropdownItems = wrapper.findAllComponents(CDropdownItem);
        expect(cDropdownItems.every(item => item.isVisible())).toBe(true);
        expect(cDropdownItems.every(item => expect(item.classes()).toContain("item"))).toBe(true);

        const dropdownItem = wrapper.findAllComponents(DropdownItem);
        dropdownItem.forEach((item, index) => {
            expect(item.props("option")).toStrictEqual(flatOptions[index]);
        });
    });

    it("sets label as expected", () => {
        const wrapper = getWrapper("id1_1");
        const cDropdownToggle = wrapper.findComponent(CDropdownToggle);
        expect(cDropdownToggle.find("span").text()).toBe("child1");
    });

    it("toggle dropdown menu toggles show", () => {
        const wrapper = getWrapper();
        wrapper.vm.showDropdownMenu = true;
        wrapper.vm.toggleDropdownMenu();
        expect(wrapper.vm.showDropdownMenu).toBe(false);
    });

    it("expand works as expected with dropdown item emits expand", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("expand", "/id1");
        // child should be expanded
        expect(wrapper.vm.flatOptions[1].show).toBe(true);
    });

    it("collapse works as expected", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("expand", "/id1");
        expect(wrapper.vm.flatOptions[1].show).toBe(true);

        dropdownItems[0].vm.$emit("collapse", "/id1");
        expect(wrapper.vm.flatOptions[1].show).toBe(false);
    });

    it("handleSelectItem works as expected", () => {
        const wrapper = getWrapper();
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        dropdownItems[0].vm.$emit("select-item", "id1_1");
        expect(wrapper.emitted("update:modelValue")![0][0]).toBe("id1_1");
        expect(wrapper.vm.showDropdownMenu).toBe(false);
    });

    it("preventDefault prevents default", () => {
        const wrapper = getWrapper();
        wrapper.vm.preventDefault({ preventDefault: mockPreventDefault } as any);
        expect(mockPreventDefault.mock.calls.length).toBe(1);
    });
});