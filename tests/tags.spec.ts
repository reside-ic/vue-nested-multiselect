import { mount } from "@vue/test-utils";
import Tags from "../src/components/Tags.vue";
import { CButton } from "@coreui/vue";
import { vi } from "vitest";
describe("Tag tests", () => {
    const mockPreventDefault = vi.fn();
    const mockStopPropagation = vi.fn();

    const tagsProp = [
        {
            id: "id1",
            label: "label1"
        },
        {
            id: "id2",
            label: "label2"
        }
    ];

    const getWrapper = () => {
        return mount(Tags, {
            props: { tags: tagsProp }
        })
    };

    it("renders as expected", () => {
        const wrapper = getWrapper();
        const span = wrapper.find("span");
        expect(span.classes()).toContain("tag-div");
        const tags = wrapper.findAllComponents(CButton);
        expect(tags.length).toBe(2);
    });

    it("emits select tag as expected", () => {
        const wrapper = getWrapper();
        const tags = wrapper.findAllComponents(CButton);
        expect(tags.every((tag, index) => {
            expect(tag.classes()).toContain("tag");
            expect(tag.text()).toBe(tagsProp[index].label);
            tag.trigger("click");
            expect(wrapper.emitted("select-tag")![0][0]).toBe(tagsProp[index].id);
        }));
    });

    it("prevents default and stops propagation when tag clicked", () => {
        const wrapper = getWrapper();
        wrapper.vm.handleTagClick({
            preventDefault: mockPreventDefault,
            stopPropagation: mockStopPropagation
        } as any, "whatever");
        expect(mockPreventDefault.mock.calls.length).toBe(1);
        expect(mockStopPropagation.mock.calls.length).toBe(1);
    });
});