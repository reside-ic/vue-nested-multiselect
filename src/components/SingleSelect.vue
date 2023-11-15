<template>
  <base-select :options="options"
               :show-dropdown-menu="showDropdownMenu"
               @hide="() => showDropdownMenu = false"
               @toggle-click="toggleDropdownMenu"
               @select-item="handleSelectItem">
    <span class="label">{{ label || placeholder }}</span>
  </base-select>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent, ref } from 'vue';
  import { Option } from "../types";
  import useBaseSelect from '../mixins/useBaseSelect';
  import BaseSelect from './BaseSelect.vue';

  export default defineComponent({
    emits: ["update:modelValue"],
    components: {
      BaseSelect
    },
    props: {
      options: {
        type: Array as PropType<Option[]>,
        default: () => []
      },
      placeholder: {
        type: String,
        default: "Select..."
      },
      modelValue: {
        type: String as PropType<string | undefined | null>
      }
    },
    setup(props, { emit }) {
      const { flatOptions } = useBaseSelect(props.options);

      const showDropdownMenu = ref<boolean>(false);
      const toggleDropdownMenu = () => {
        showDropdownMenu.value = !showDropdownMenu.value;
      }

      const label = computed(() => {
        return flatOptions.value.find(op => op.id === props.modelValue)?.label
      });

      const handleSelectItem = (optionId: string) => {
        emit("update:modelValue", optionId);
        showDropdownMenu.value = false;
      };

      return {
        flatOptions,
        showDropdownMenu,
        toggleDropdownMenu,
        label,
        handleSelectItem
      }
    },
  })
</script>

<style scoped>
.label {
  margin-right: 10px;
  white-space: normal;
  overflow: auto;
  overflow-wrap: break-word;
  text-align: left;
}
</style>