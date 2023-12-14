<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useBaseSelect from "../../../src/mixins/useBaseSelect";

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

export default defineComponent({
    setup() {
        return useBaseSelect(options);
    }
});
</script>