<template>
    <c-dropdown auto-close="outside"
                :popper="false"
                class="dropdown">
      <c-dropdown-toggle class="tag-toggle">
        <span class="tag-div">
          <template v-if="tags.length > 0" v-for="tag in tags">
            <c-button @click="(event) => handleTagClick(event, tag.id)"
                      class="tag">{{ tag.label }}</c-button>
          </template>
        </span>
        <span v-show="tags.length === 0"
              class="placeholder-span">{{ placeholder }}</span>
      </c-dropdown-toggle>
      <c-dropdown-menu class="menu"
                       @click="preventDefault"
                       @mousedown="preventDefault">
        <template v-for="option in flatOptions">
          <c-dropdown-item v-show="option.show" class="item">
            <dropdown-item :option="option"
                           :multiple="true"
                           :checked="checkedObject[option.path]"
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
  import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from "@coreui/vue";
  import { Option, FlatOption, CheckStatus } from "./types";
  import DropdownItem from './DropdownItem.vue';
  import { flattenOptions, expandOptions, collapseOptions, createCheckedObject, getAllNestedChildrenIds, getTopLevelOptionTags } from "./utils";

  export default defineComponent({
    emits: ["update:modelValue"],
    components: {
      CDropdown,
      CDropdownToggle,
      CDropdownItem,
      CDropdownMenu,
      DropdownItem,
      CButton
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
      const flatOps: FlatOption[] = [];
      flattenOptions(flatOps, props.options);
      const flatOptions = ref(flatOps);

      const tags = computed(() => {
        const allSelectedOptions: FlatOption[] = props.modelValue?.map(value => {
          return flatOptions.value.find(op => op.id === value)!;
        }) || [];
        return getTopLevelOptionTags(allSelectedOptions, flatOptions.value, checkedObject.value);
      });

      const handleTagClick = (event: MouseEvent, optionId: string) => {
        event.preventDefault();
        event.stopPropagation();
        handleSelectItem(optionId);
      };

      const checkedObject = computed(() => {
        const childrenIds = getAllNestedChildrenIds(flatOptions.value, props.modelValue || []);
        return createCheckedObject(flatOptions.value, childrenIds);
      });

      const expand = (optionPath: string) => {
        const newFlatOptions = expandOptions(flatOptions.value, optionPath);
        flatOptions.value = newFlatOptions;
      };

      const collapse = (optionPath: string) => {
        const newFlatOptions = collapseOptions(flatOptions.value, optionPath);
        flatOptions.value = newFlatOptions;
      };

      const handleSelectItem = (optionId: string) => {
        const option = flatOptions.value.find(op => op.id === optionId)!;
        const checkStatus = checkedObject.value[option.path];
        // The are 4 cases, each emit will have an explantion of the case above it
        if (option.hasChildren) {
          const childrenIds = getAllNestedChildrenIds(flatOptions.value, [optionId]);
          if (checkStatus === CheckStatus.CHECKED || checkStatus === CheckStatus.PARTIAL) {
            const parentIds = option.path.split("/");
            parentIds.shift();
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
            const parentIds = option.path.split("/")
            parentIds.shift();
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
        tags,
        flatOptions,
        expand,
        collapse,
        handleSelectItem,
        preventDefault,
        checkedObject,
        handleTagClick
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

.tag-div > .btn {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.tag-toggle {
  max-width: 100%;
  display: flex;
  align-items: center;
}

.tag-div {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.25rem;
  row-gap: 0.25rem;
}

.tag, .tag:hover, .tag:focus, .tag:active {
  font-size: 0.75rem;
  color: white !important;
  background-color: #e31837 !important;
  border-color: #e31837 !important;
}

.placeholder-span {
  margin-top: 1px;
  margin-bottom: 1px;
}


.dropdown-toggle::after {
  margin-left: auto;
}

.btn {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>