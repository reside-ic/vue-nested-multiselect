<template>
    <c-dropdown auto-close="outside"
                :popper="false"
                class="dropdown">
      <c-dropdown-toggle>
        <template v-if="tagsArray.length > 0">
          <tags :tags="tagsArray" @select-tag="handleTagSelect"/>
        </template>
        <span v-if="tagsArray.length === 0"
              class="placeholder-span">{{ placeholder }}</span>
      </c-dropdown-toggle>
      <c-dropdown-menu class="menu"
                       @click="preventDefault"
                       @mousedown="preventDefault">
        <template v-for="option in flatOptions">
          <c-dropdown-item v-show="option.show" class="item">
            <dropdown-item :option="option"
                           :checked="checkedObject[option.path.join('/')]"
                           @expand="expand"
                           @collapse="collapse"
                           @select-item="handleSelectItem"></dropdown-item>
          </c-dropdown-item>
        </template>
      </c-dropdown-menu>
    </c-dropdown>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent, ref } from 'vue';
  import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
  import { Option, FlatOption, CheckStatus } from "../types";
  import DropdownItem from './DropdownItem.vue';
  import Tags from './Tags.vue';
  import { expandOptions, collapseOptions, createCheckedObject, getAllNestedChildrenIds, getTopLevelOptionTags } from "../utils";
import { getFlattenedOptions } from '../utils';

  export default defineComponent({
    emits: ["update:modelValue"],
    components: {
      CDropdown,
      CDropdownToggle,
      CDropdownItem,
      CDropdownMenu,
      DropdownItem,
      Tags
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
        type: Array as PropType<string[] | null>,
      }
    },
    setup(props, { emit }) {
      const flatOptions = ref<FlatOption[]>(getFlattenedOptions(props.options));

      const tagsArray = computed(() => {
        const allSelectedOptions: FlatOption[] = props.modelValue?.map(value => {
          return flatOptions.value.find(op => op.id === value)!;
        }) || [];
        return getTopLevelOptionTags(allSelectedOptions, flatOptions.value, checkedObject.value);
      });

      const handleTagSelect = (optionId: string) => {
        handleSelectItem(optionId);
      };

      const checkedObject = computed(() => {
        const childrenIds = getAllNestedChildrenIds(flatOptions.value, props.modelValue || []);
        return createCheckedObject(flatOptions.value, childrenIds);
      });

      const expand = (optionPath: string[]) => {
        expandOptions(flatOptions.value, optionPath);
      };

      const collapse = (optionPath: string[]) => {
        collapseOptions(flatOptions.value, optionPath);
      };

      const handleSelectItem = (optionId: string) => {
        const option = flatOptions.value.find(op => op.id === optionId)!;
        const checkStatus = checkedObject.value[option.path.join("/")];
        // The are 4 cases, each emit will have an explantion of the case above it
        if (option.hasChildren) {
          const childrenIds = getAllNestedChildrenIds(flatOptions.value, [optionId]);
          if (checkStatus === CheckStatus.CHECKED || checkStatus === CheckStatus.PARTIAL) {
            const parentIds = option.path;
            const uncheckIds = [...childrenIds, ...parentIds];
            /*
            This case is if an option has children and it is checked (or partially checked). We
            remove 2 sets of options:
            1. Any nested children are unchecked
            2. Any parents (found from the ids in its path) are unchecked too. This is because
               one of their children was unchecked so they cannot be fully checked anymore
            */
            emit("update:modelValue", [...props.modelValue?.filter(val => !uncheckIds.includes(val)) || []]);
          } else {
            // This case is if an option has children and it is unchecked. We are just checking
            // all the nested children here.
            emit("update:modelValue", [...props.modelValue || [], ...childrenIds]);
          }
        } else {
          if (checkStatus === CheckStatus.CHECKED || checkStatus === CheckStatus.PARTIAL) {
            const parentIds = option.path;
            // This case is if an option doesn't have children and is checked (or partially checked).
            // We remove parents from being checked since not all their children are checked anymore.
            emit("update:modelValue", [...props.modelValue?.filter(val => !parentIds.includes(val)) || []]);
          } else {
            // This case is if an option doesn't have children and is unchecked. We simply add the
            // option to the checked values.
            emit("update:modelValue", [...props.modelValue || [], optionId]);
          }
        }
      }

      const preventDefault = (event: Event) => {
        event.preventDefault();
      }

      return {
        tagsArray,
        flatOptions,
        expand,
        collapse,
        handleSelectItem,
        preventDefault,
        checkedObject,
        handleTagSelect
      }
    }
  });
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

.placeholder-span {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>