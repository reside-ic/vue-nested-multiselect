import { vi } from 'vitest';
import { shallowMount } from "@vue/test-utils";
import Dummy from "./Dummy.vue";

// seems to be default for jsdom
const innerScreenHeight = 768

describe("useBaseSelect mixin tests", () => {
    const getWrapper = () => {
        return shallowMount(Dummy)
    };

    test("adds update y value to scroll event listener on mount", () => {
        const addEventListener = vi.spyOn(window, "addEventListener");
        const wrapper = getWrapper();
        expect(addEventListener.mock.calls[0][0]).toBe("scroll");
        expect(addEventListener.mock.calls[0][1]).toBe(wrapper.vm.updateYPosition);
    });

    test("removes update y value scroll event listener on unmount", () => {
        const addEventListener = vi.spyOn(window, "removeEventListener");
        const wrapper = getWrapper();
        wrapper.unmount();
        expect(addEventListener.mock.calls[0][0]).toBe("scroll");
        expect(addEventListener.mock.calls[0][1]).toBe(wrapper.vm.updateYPosition);
    });

    test("update y value works as expected", () => {
        const wrapper = getWrapper();
        wrapper.vm.dropdownRef.getBoundingClientRect = () => {
            return { y: 1, height: 2 }
        };
        wrapper.vm.updateYPosition();
        expect(wrapper.vm.bottomYPosition).toBe(3);
    });

    test("direction swtiches as expected", () => {
        const wrapper = getWrapper();
        wrapper.vm.bottomYPosition = 418;
        expect(wrapper.vm.direction).toBe(undefined);
        wrapper.vm.bottomYPosition = 419;
        expect(wrapper.vm.direction).toBe("dropup");
        wrapper.vm.bottomYPosition = null;
        expect(wrapper.vm.direction).toBe(undefined);
    });
});