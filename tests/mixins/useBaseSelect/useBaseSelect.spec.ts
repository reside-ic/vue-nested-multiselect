import { shallowMount } from "@vue/test-utils";
import Dummy from "./Dummy.vue";

const expectedFlatOptions = [
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
]

describe("useBaseSelect mixin tests", () => {
    const getWrapper = () => {
        return shallowMount(Dummy)
    };

    test("flatOptions works as expected", () => {
        const wrapper = getWrapper();
        expect(wrapper.vm.flatOptions).toStrictEqual(expectedFlatOptions);
    });

    test("expand works as expected", () => {
        const wrapper = getWrapper();
        wrapper.vm.expand(["id1"]);
        expect(wrapper.vm.flatOptions[1].show).toBe(true);
    });

    test("collapse works as expected", () => {
        const wrapper = getWrapper();
        wrapper.vm.expand(["id1"]);
        expect(wrapper.vm.flatOptions[1].show).toBe(true);
        wrapper.vm.collapse(["id1"]);
        expect(wrapper.vm.flatOptions[1].show).toBe(false);
    });
});