import { shallowMount } from "@vue/test-utils";
import DropdownItem from "../src/components/DropdownItem.vue";
import VueFeather from "vue-feather";
import { vi } from "vitest";

describe("Dropdown item tests", () => {
    const mockExpand = vi.fn();
    const mockCollapse = vi.fn();
    const mockPreventDefault = vi.fn();
    const mockStopPropagation = vi.fn();

    const getWrapper = (props) => {
        return shallowMount(DropdownItem, {props});
    };

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders as expected with children", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            label: "testLabel",
            id: "testId",
            indentation: 4
        });

        const dropdownItemDiv = wrapper.find("div");
        expect(dropdownItemDiv.classes()).toStrictEqual(["dropdown-item-div"]);
        expect(dropdownItemDiv.attributes("style")).toBe("padding-left: 6.9rem;")

        const [iconDiv, textDiv] = dropdownItemDiv.findAll("div");
        expect(iconDiv.classes()).toStrictEqual(["icon-div"]);
        expect(textDiv.classes()).toStrictEqual(["text-div"]);

        const [chevronDown, chevronUp] = iconDiv.findAllComponents(VueFeather);
        expect(chevronDown.props("type")).toBe("chevron-down");
        expect(chevronDown.classes()).toStrictEqual(["icon"]);
        expect(chevronUp.props("type")).toBe("chevron-up");
        expect(chevronUp.classes()).toStrictEqual(["icon"]);

        expect(textDiv.classes()).toStrictEqual(["text-div"]);
        expect(textDiv.find("span").text()).toBe("testLabel");
    });

    it("does not render icons if no children", () => {
        const wrapper = getWrapper({
            hasChildren: false,
            label: "testLabel",
            id: "testId",
            indentation: 4
        });

        expect(wrapper.findAllComponents(VueFeather)).toStrictEqual([]);
    });

    it("emits value when clicked", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            label: "testLabel",
            id: "testId",
            indentation: 4
        });

        const dropdownItemDiv = wrapper.find("div");
        dropdownItemDiv.trigger("click");
        expect(wrapper.emitted("select-item")![0][0]).toBe("testId");
    });

    it("calls expand when icon clicked and option closed", async () => {
        const wrapper = getWrapper({
            hasChildren: true,
            label: "testLabel",
            id: "testId",
            indentation: 4,
            expand: mockExpand,
            collapse: mockCollapse,
            open: false
        });

        wrapper.vm.handleIconClick({
            preventDefault: mockPreventDefault,
            stopPropagation: mockStopPropagation
        } as any);

        expect(mockPreventDefault.mock.calls.length).toBe(1);
        expect(mockStopPropagation.mock.calls.length).toBe(1);
        expect(mockExpand.mock.calls.length).toBe(1);
        expect(mockCollapse.mock.calls.length).toBe(0);

        await wrapper.setProps({open: true});
    });

    it("calls collapse when when icon clicked and option open", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            label: "testLabel",
            id: "testId",
            indentation: 4,
            expand: mockExpand,
            collapse: mockCollapse,
            open: true
        });

        wrapper.vm.handleIconClick({
            preventDefault: mockPreventDefault,
            stopPropagation: mockStopPropagation
        } as any);

        expect(mockPreventDefault.mock.calls.length).toBe(1);
        expect(mockStopPropagation.mock.calls.length).toBe(1);
        expect(mockExpand.mock.calls.length).toBe(0);
        expect(mockCollapse.mock.calls.length).toBe(1);
    });
});