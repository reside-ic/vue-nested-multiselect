import { shallowMount } from "@vue/test-utils";
import HelloWorld from "../../src/components/Component.vue";

describe("component tests", () => {
    it("renders as expected", () => {
        const wrapper = shallowMount(HelloWorld);
        expect(wrapper.text()).toBe("Hello World");
    });
});