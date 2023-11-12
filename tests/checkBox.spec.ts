import { mount } from "@vue/test-utils";
import { CheckStatus } from "../src/types";
import CheckBox from "../src/components/CheckBox.vue";
import { CButton } from "@coreui/vue";
import VueFeather from "vue-feather";

describe("Check Box tests", () => {
    const getWrapper = (checked: CheckStatus) => {
        return mount(CheckBox, {
            props: { checked }
        })
    };

    it("renders as expected", () => {
        const wrapper = getWrapper(CheckStatus.CHECKED);
        const divs = [
            ...wrapper.findAll(".checked-div"),
            ...wrapper.findAll(".unchecked-div")
        ]
        expect(divs.length).toBe(3);
        divs.forEach(div => {
            const button = div.findComponent(CButton);
            expect(button.exists()).toBe(true);
            expect(button.classes()).toContain("check-button");
            expect(button.props("disabled")).toBe(true);
        });
    });

    it("renders tick when checked", () => {
        const wrapper = getWrapper(CheckStatus.CHECKED);
        const icons = wrapper.findAllComponents(VueFeather);
        expect(icons.length).toBe(2);
        expect(icons[0].isVisible()).toBe(true);
        expect(icons[1].isVisible()).toBe(false);
        expect(icons[0].props("type")).toBe("check");
        expect(icons[0].props("strokeWidth")).toBe("3");
        expect(wrapper.find(".unchecked-div").isVisible()).toBe(false);
    });

    it("renders dash when partially checked", () => {
        const wrapper = getWrapper(CheckStatus.PARTIAL);
        const icons = wrapper.findAllComponents(VueFeather);
        expect(icons.length).toBe(2);
        expect(icons[0].isVisible()).toBe(false);
        expect(icons[1].isVisible()).toBe(true);
        expect(icons[1].props("type")).toBe("minus");
        expect(icons[1].props("strokeWidth")).toBe("3");
        expect(wrapper.find(".unchecked-div").isVisible()).toBe(false);
    });

    it("renders no icon when unchecked", () => {
        const wrapper = getWrapper(CheckStatus.UNCHECKED);
        const icons = wrapper.findAllComponents(VueFeather);
        expect(icons[0].isVisible()).toBe(false);
        expect(icons[1].isVisible()).toBe(false);
        expect(wrapper.find(".unchecked-div").isVisible()).toBe(true);
    });
});
