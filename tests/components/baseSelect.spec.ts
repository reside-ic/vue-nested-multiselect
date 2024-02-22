import { mount } from "@vue/test-utils";
import BaseSelect from "../../src/components/BaseSelect.vue";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/vue";
import DropdownItem from "../../src/components/DropdownItem.vue";

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
        id: 'id2',
        label: 'parent2',
        path: ['id2'],
        show: true,
        hasChildren: false
    },
];

describe("base select tests", () => {
    const getWrapper = (emptyOptions: boolean = false) => {
        return mount(BaseSelect, {
            props: {
                options: emptyOptions ? undefined : options
            },
            slots: {
                default: '<div id="slot">Random</div>'
            }
        });
    };

    test("renders as expected for single select", () => {
        const wrapper = getWrapper();

        const cDropdown = wrapper.findComponent(CDropdown);
        expect(cDropdown.props("autoClose")).toBe("outside");
        expect(cDropdown.props("popper")).toBe(false);
        expect(cDropdown.classes()).toContain("vnm-dropdown");

        const cDropdownToggle = wrapper.findComponent(CDropdownToggle);
        expect(cDropdownToggle.find("#slot").text()).toBe("Random");

        const cDropdownMenu = wrapper.findComponent(CDropdownMenu);
        expect(cDropdownMenu.exists()).toBe(true);
        expect(cDropdownMenu.classes()).toContain("vnm-menu");

        const cDropdownItems = wrapper.findAllComponents(CDropdownItem);
        // middle item is a child so not visible right now
        expect(cDropdownItems.every((item, index) => index === 1 ? !item.isVisible() : item.isVisible()))
            .toBe(true);
        expect(cDropdownItems.every(item => expect(item.classes()).toContain("vnm-item"))).toBe(true);

        const dropdownItem = wrapper.findAllComponents(DropdownItem);
        dropdownItem.forEach((item, index) => {
            expect(item.props("option")).toStrictEqual(flatOptions[index]);
            expect(item.props("checked")).toBe(undefined);
        });
    });

    test("hide event in cDropdown emits hide", () => {
        const wrapper = getWrapper();
        const cDropdown = wrapper.findComponent(CDropdown);
        cDropdown.vm.$emit("hide");
        expect(wrapper.emitted("hide")![0]).toStrictEqual([]);
    });

    test("click event in cDropdownToggle emits toggle-click", () => {
        const wrapper = getWrapper();
        const cDropdownToggle = wrapper.findComponent(CDropdownToggle);
        cDropdownToggle.vm.$emit("click");
        expect(wrapper.emitted("toggle-click")![0]).toStrictEqual([]);
    });

    test("select item emit works as expected", () => {
        const wrapper = getWrapper();
        const dropdownItem1 = wrapper.findAllComponents(DropdownItem)[0];
        dropdownItem1.vm.$emit("select-item", "test");
        expect(wrapper.emitted("select-item")![0][0]).toBe("test");
    });

    test("empty options render nothing", () => {
        const wrapper = getWrapper(true);
        const dropdownItems = wrapper.findAllComponents(DropdownItem);
        expect(dropdownItems.length).toBe(0);
    });
});