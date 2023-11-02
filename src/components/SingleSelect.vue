<template>
    <c-dropdown auto-close="outside"
                class="dropdown"
                :visible="showDropdownMenu">
      <c-dropdown-toggle @click="toggleDropdownMenu">
        <span>{{ label || placeholder }}</span>
      </c-dropdown-toggle>
      <c-dropdown-menu class="menu"
                       @click="preventDefault"
                       @mousedown="preventDefault">
        <template v-for="option in flatOptions">
          <c-dropdown-item v-show="option.show" class="item">
            <dropdown-item :has-children="option.hasChildren"
                           :label="option.label"
                           :id="option.id"
                           :expand="(event) => expand(event, option.path)"
                           :collapse="(event) => collapse(event, option.path)"
                           :indentation="option.path.split('/').length - 2"
                           :open="option.hasChildren && option.open"
                           @select-item="handleSelectItem"></dropdown-item>
          </c-dropdown-item>
        </template>
      </c-dropdown-menu>
    </c-dropdown>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent, ref } from 'vue';
  import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
  import { Option, FlatOption } from "./types";
  import DropdownItem from './DropdownItem.vue';
  import { flattenOptions, expandOptions, collapseOptions } from "./utils";

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
      const flatOps: FlatOption[] = [];
      flattenOptions(flatOps, props.options);

      const flatOptions = ref(flatOps);
      const showDropdownMenu = ref<boolean | undefined>(undefined);

      const label = computed(() => {
        return flatOptions.value.find(op => op.id === props.modelValue)?.label
      });

      const toggleDropdownMenu = () => {
        showDropdownMenu.value = !showDropdownMenu.value;
      }

      const expand = (event: Event, optionPath: string) => {
        event.preventDefault();
        const newFlatOptions = expandOptions(flatOptions.value, optionPath);
        flatOptions.value = newFlatOptions;
      };

      const collapse = (event: Event, optionPath: string) => {
        event.preventDefault();
        const newFlatOptions = collapseOptions(flatOptions.value, optionPath);
        flatOptions.value = newFlatOptions;
      };

      const handleSelectItem = (optionId: string) => {
        emit("update:modelValue", optionId);
        showDropdownMenu.value = false;
      }

      const preventDefault = (event: Event) => {
        event.preventDefault();
      }

      return {
        showDropdownMenu,
        label,
        flatOptions,
        expand,
        collapse,
        handleSelectItem,
        preventDefault,
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
</style>