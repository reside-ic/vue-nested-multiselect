import { shallowMount } from "@vue/test-utils";
import DropdownItem from "../../src/components/DropdownItem.vue";
import VueFeather from "vue-feather";
import { vi } from "vitest";
import { CheckStatus, FlatOption } from "../../src/types";
import CheckBox from "../../src/components/CheckBox.vue";

describe("Dropdown item tests", () => {
    const baseOption: FlatOption = {
        hasChildren: false,
        label: "testLabel",
        id: "testId",
        path: ["my", "test", "path", "and", "testId"],
        show: false
    }

    const getWrapper = (options: Partial<FlatOption>, checked: CheckStatus | undefined = undefined) => {
        return shallowMount(DropdownItem, {
            props: {
                option: {
                    ...baseOption,
                    ...options
                } as any,
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
        expect(dropdownItemDiv.classes()).toContain("vnm-dropdown-item-div");
        expect(dropdownItemDiv.attributes("style")).toBe("padding-left: 6.5rem;")

        const [iconDiv, textDiv] = dropdownItemDiv.findAll("div");
        expect(iconDiv.classes()).toContain("vnm-icon-div");
        expect(textDiv.classes()).toContain("vnm-text-div");

        const [chevronRight, chevronDown] = iconDiv.findAllComponents(VueFeather);
        expect(chevronRight.props("type")).toBe("chevron-right");
        expect(chevronRight.classes()).toContain("vnm-icon");
        expect(chevronDown.props("type")).toBe("chevron-down");
        expect(chevronDown.classes()).toContain("vnm-icon");

        const checkDiv = dropdownItemDiv.findComponent(CheckBox);
        expect(checkDiv.exists()).toBe(false);

        expect(textDiv.classes()).toContain("vnm-text-div");
        expect(textDiv.find("span").text()).toBe("testLabel");
    });

    it("does not render icons if no children", () => {
        const wrapper = getWrapper({});
        expect(wrapper.findAllComponents(VueFeather)).toStrictEqual([]);
    });

    it("renders check mark if checked", () => {
        const wrapper = getWrapper({}, CheckStatus.UNCHECKED);
        const checkDiv = wrapper.find(".vnm-check-div");
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

        wrapper.find(".vnm-icon-div").trigger("click");
        expect(wrapper.emitted("expand")![0][0]).toStrictEqual(["my", "test", "path", "and", "testId"]);
    });

    it("calls collapse when when icon clicked and option open", () => {
        const wrapper = getWrapper({
            hasChildren: true,
            open: true
        });

        wrapper.find(".vnm-icon-div").trigger("click");
        expect(wrapper.emitted("collapse")![0][0]).toStrictEqual(["my", "test", "path", "and", "testId"]);
    });
});