<template>
    <c-dropdown auto-close="outside"
                class="dropdown"
                :popper="false"
                :visible="showDropdownMenu">
      <c-dropdown-toggle @click="toggleDropdownMenu">
        <span class="label">{{ label || placeholder }}</span>
      </c-dropdown-toggle>
      <c-dropdown-menu class="menu"
                       @click.prevent
                       @mousedown.prevent>
        <template v-for="option in flatOptions">
          <c-dropdown-item v-show="option.show" class="item">
            <dropdown-item :option="option"
                           @expand="expand"
                           @collapse="collapse"
                           @select-item="handleSelectItem"></dropdown-item>
          </c-dropdown-item>
        </template>
      </c-dropdown-menu>
    </c-dropdown>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent, ref, watch } from 'vue';
  import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
  import { Option, FlatOption } from "../types";
  import DropdownItem from './DropdownItem.vue';
  import { expandOptions, collapseOptions, getFlattenedOptions } from "../utils";

  export default defineComponent({
    emits: ["update:modelValue"],
    components: {
      CDropdown,
      CDropdownToggle,
      CDropdownItem,
      CDropdownMenu,
      DropdownItem
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
      const flatOptions = ref<FlatOption[]>(getFlattenedOptions(props.options));

      const showDropdownMenu = ref<boolean>(false);

      const label = computed(() => {
        return flatOptions.value.find(op => op.id === props.modelValue)?.label
      });

      const toggleDropdownMenu = () => {
        showDropdownMenu.value = !showDropdownMenu.value;
      }

      const expand = (optionPath: string[]) => {
        expandOptions(flatOptions.value, optionPath);
      };

      const collapse = (optionPath: string[]) => {
        collapseOptions(flatOptions.value, optionPath);
      };

      const handleSelectItem = (optionId: string) => {
        emit("update:modelValue", optionId);
        showDropdownMenu.value = false;
      }

      watch(flatOptions, () => {
        console.log("update")
      }, { deep: true });

      return {
        showDropdownMenu,
        label,
        flatOptions,
        expand,
        collapse,
        handleSelectItem,
        toggleDropdownMenu
      }
    },
  })
</script>

<style scoped>
.dropdown {
  width: 100%;
}

.menu {
  width: 100%;
}

.item {
  padding: 0;
  display: flex;
}

.item:hover {
  cursor: pointer;
}

.dropdown-toggle {
  max-width: 100%;
  display: flex;
  align-items: center;
}

.dropdown-toggle::after {
  margin-left: auto;
}

.label {
  margin-right: 10px;
  white-space: normal;
  overflow: auto;
  overflow-wrap: break-word;
  text-align: left;
}
</style>../utils