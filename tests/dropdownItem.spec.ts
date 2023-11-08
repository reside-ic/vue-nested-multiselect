import { shallowMount } from "@vue/test-utils";
import DropdownItem from "../src/components/DropdownItem.vue";
import VueFeather from "vue-feather";
import { vi } from "vitest";
import { CheckStatus, FlatOption } from "../src/components/types";
import CheckBox from "../src/components/CheckBox.vue";

describe("Dropdown item tests", () => {
    const mockPreventDefault = vi.fn();
    const mockStopPropagation = vi.fn();

    const baseOption: FlatOption = {
        hasChildren: false,
        label: "testLabel",
        id: "testId",
        path: ["my", "test", "path", "and", "testId"],
        show: false
    }

    const getWrapper = (options, checked: CheckStatus | undefined = undefined) => {
        return shallowMount(DropdownItem, {
            props: {
                option: {
                    ...baseOption,
                    ...options
                },
                checked
            }
        });
    };

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders as expected with children", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            open: false
        });

        const dropdownItemDiv = wrapper.find("div");
        expect(dropdownItemDiv.classes()).toContain("dropdown-item-div");
        expect(dropdownItemDiv.attributes("style")).toBe("padding-left: 6.9rem;")

        const [iconDiv, textDiv] = dropdownItemDiv.findAll("div");
        expect(iconDiv.classes()).toContain("icon-div");
        expect(textDiv.classes()).toContain("text-div");

        const [chevronRight, chevronDown] = iconDiv.findAllComponents(VueFeather);
        expect(chevronRight.props("type")).toBe("chevron-right");
        expect(chevronRight.classes()).toContain("icon");
        expect(chevronDown.props("type")).toBe("chevron-down");
        expect(chevronDown.classes()).toContain("icon");

        const checkDiv = dropdownItemDiv.findComponent(CheckBox);
        expect(checkDiv.exists()).toBe(false);

        expect(textDiv.classes()).toContain("text-div");
        expect(textDiv.find("span").text()).toBe("testLabel");
    });

    it("does not render icons if no children", () => {
        const wrapper = getWrapper({});
        expect(wrapper.findAllComponents(VueFeather)).toStrictEqual([]);
    });

    it("renders check mark if checked", () => {
        const wrapper = getWrapper({}, CheckStatus.UNCHECKED);
        const checkDiv = wrapper.find(".check-div");
        expect(checkDiv.exists()).toBe(true);
        expect(checkDiv.findComponent(CheckBox).exists()).toBe(true);
    });

    it("emits value when clicked", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            open: false
        });

        const dropdownItemDiv = wrapper.find("div");
        dropdownItemDiv.trigger("click");
        expect(wrapper.emitted("select-item")![0][0]).toBe("testId");
    });

    it("calls expand when icon clicked and option closed", async () => {
        const wrapper = getWrapper({
            hasChildren: true,
            open: false
        });

        wrapper.vm.handleIconClick({
            preventDefault: mockPreventDefault,
            stopPropagation: mockStopPropagation
        } as any);

        expect(mockPreventDefault.mock.calls.length).toBe(1);
        expect(mockStopPropagation.mock.calls.length).toBe(1);
        expect(wrapper.emitted("expand")![0][0]).toStrictEqual(["my", "test", "path", "and", "testId"]);
    });

    it("calls collapse when when icon clicked and option open", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            open: true
        });

        wrapper.vm.handleIconClick({
            preventDefault: mockPreventDefault,
            stopPropagation: mockStopPropagation
        } as any);

        expect(mockPreventDefault.mock.calls.length).toBe(1);
        expect(mockStopPropagation.mock.calls.length).toBe(1);
        expect(wrapper.emitted("collapse")![0][0]).toStrictEqual(["my", "test", "path", "and", "testId"]);
    });
});