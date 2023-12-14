import { mount } from "@vue/test-utils";
import SingleSelect from "../../src/components/SingleSelect.vue";
import BaseSelect from "../../src/components/BaseSelect.vue";

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

        const baseSelect = wrapper.findComponent(BaseSelect);
        expect(baseSelect.props("options")).toStrictEqual(options);
        expect(baseSelect.props("showDropdownMenu")).toBe(false);

        const label = baseSelect.find(".label");
        expect(label.text()).toBe("Select...");
    });

    it("sets label as expected", () => {
        const wrapper = getWrapper("id1_1");
        const label = wrapper.find(".label");
        expect(label.text()).toBe("child1");
    });

    it("toggle click toggles showDropdownMenu", () => {
        const wrapper = getWrapper();
        const baseSelect = wrapper.findComponent(BaseSelect);
        baseSelect.vm.$emit("toggle-click");
        // is false by default
        expect(wrapper.vm.showDropdownMenu).toBe(true);
    });

    it("show dropdown menu is set to false when menu hides", () => {
        const wrapper = getWrapper();
        const baseSelect = wrapper.findComponent(BaseSelect);
        wrapper.vm.showDropdownMenu = true;
        baseSelect.vm.$emit("hide");
        expect(wrapper.vm.showDropdownMenu).toBe(false);
    });

    it("select item event correctly triggers handleSelectItem", () => {
        const wrapper = getWrapper();
        const baseSelect = wrapper.findComponent(BaseSelect);
        baseSelect.vm.$emit("select-item", "id1_1");
        expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual({id: "id1_1", label: "child1"});
        expect(wrapper.vm.showDropdownMenu).toBe(false);
    });
});