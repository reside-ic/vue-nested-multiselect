import { mount } from "@vue/test-utils";
import BaseSelect from "../src/components/BaseSelect.vue";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/vue";
import DropdownItem from "../src/components/DropdownItem.vue";
import { CheckStatus } from "../src/types";

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

const checkedObject = {
    "id1": CheckStatus.CHECKED,
    "id1/id1_1": CheckStatus.CHECKED,
    "id2": CheckStatus.UNCHECKED
}

describe("base select tests", () => {
    const getWrapper = (multiple: boolean) => {
        return mount(BaseSelect, {
            props: {
                options,
                checkedObject: multiple ? checkedObject : undefined
            },
            slots: {
                default: '<div id="slot">Random</div>'
            }
        });
    };

    test("renders as expected for single select", () => {
        const wrapper = getWrapper(false);

        const cDropdown = wrapper.findComponent(CDropdown);
        expect(cDropdown.props("autoClose")).toBe("outside");
        expect(cDropdown.props("popper")).toBe(false);
        expect(cDropdown.classes()).toContain("dropdown");

        const cDropdownToggle = wrapper.findComponent(CDropdownToggle);
        expect(cDropdownToggle.find("#slot").text()).toBe("Random");

        const cDropdownMenu = wrapper.findComponent(CDropdownMenu);
        expect(cDropdownMenu.exists()).toBe(true);
        expect(cDropdownMenu.classes()).toContain("menu");

        const cDropdownItems = wrapper.findAllComponents(CDropdownItem);
        // middle item is a child so not visible right now
        expect(cDropdownItems.every((item, index) => index === 1 ? !item.isVisible() : item.isVisible()))
            .toBe(true);
        expect(cDropdownItems.every(item => expect(item.classes()).toContain("item"))).toBe(true);

        const dropdownItem = wrapper.findAllComponents(DropdownItem);
        dropdownItem.forEach((item, index) => {
            expect(item.props("option")).toStrictEqual(flatOptions[index]);
            expect(item.props("checked")).toBe(undefined);
        });
    });

    test("renders as expected for multi select", () => {
        const wrapper = getWrapper(true);

        const dropdownItem = wrapper.findAllComponents(DropdownItem);
        dropdownItem.forEach((item, index) => {
            expect(item.props("option")).toStrictEqual(flatOptions[index]);
            expect(item.props("checked")).toStrictEqual(checkedObject[Object.keys(checkedObject)[index]]);
        });
    });
});