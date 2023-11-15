<template>
    <div ref="dropdownRef">hey</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDynamicPopper from "../../../src/mixins/useDynamicPopper";

export default defineComponent({
    setup() {
        return useDynamicPopper();
    }
});
</script>
