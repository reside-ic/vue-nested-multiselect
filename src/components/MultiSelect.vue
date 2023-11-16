<template>
  <base-select :options="options"
               :checked-object="checkedObject"
               @select-item="handleSelectItem">
    <template v-slot>
      <template v-if="tagsArray.length > 0">
        <tags :tags="tagsArray" @select-tag="handleSelectItem"/>
      </template>
      <span v-if="tagsArray.length === 0"
            class="placeholder-span">{{ placeholder }}</span>  
    </template>
  </base-select>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent } from 'vue';
  import { Option, FlatOption, CheckStatus } from "../types";
  import Tags from './Tags.vue';
  import { getCheckedObject, getNestedChildrenIds, getTopLevelOptionTags, getNode } from "../utils";
  import useBaseSelect from '../mixins/useBaseSelect';
  import BaseSelect from './BaseSelect.vue';

  export default defineComponent({
    emits: ["update:modelValue"],
    components: {
      Tags,
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
        type: Array as PropType<string[] | null>,
      }
    },
    setup(props, { emit }) {
      const { flatOptions } = useBaseSelect(props.options);

      const tagsArray = computed(() => {
        const allSelectedOptions: FlatOption[] = props.modelValue?.map(value => {
          return flatOptions.value.find(op => op.id === value)!;
        }) || [];
        return getTopLevelOptionTags(allSelectedOptions, flatOptions.value, checkedObject.value);
      });

      const checkedObject = computed(() => {
        const childrenIds = getNestedChildrenIds(flatOptions.value, props.modelValue || []);
        return getCheckedObject(flatOptions.value, childrenIds);
      });

      const handleSelectItem = (optionId: string) => {
        const option = flatOptions.value.find(op => op.id === optionId)!;
        const checkStatus = checkedObject.value[option.path.join("/")];
        const fullModelValue = getNestedChildrenIds(flatOptions.value, props.modelValue || []);
        // The are 4 cases, each emit will have an explantion of the case above it
        let selectedIds: string[];
        if (option.hasChildren) {
          const childrenIds = getNestedChildrenIds(flatOptions.value, [optionId]);
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
           selectedIds = [...fullModelValue.filter(val => !uncheckIds.includes(val)) || []];
          } else {
            // This case is if an option has children and it is unchecked. We are just checking
            // all the nested children here.
            selectedIds = [...fullModelValue || [], ...childrenIds];
          }
        } else {
          if (checkStatus === CheckStatus.CHECKED) {
            const parentIds = option.path;
            // This case is if an option doesn't have children and is checked.
            // We remove parents from being checked since not all their children are checked anymore.
            selectedIds = [...fullModelValue.filter(val => !parentIds.includes(val)) || []];
          } else {
            // This case is if an option doesn't have children and is unchecked. We simply add the
            // option to the checked values.
            selectedIds = [...fullModelValue || [], optionId];
          }
        }
        const selectOptions: FlatOption[] = selectedIds.map(id => {
          return flatOptions.value.find(op => op.id === id)!;
        }) || [];
        const childrenIds = getNestedChildrenIds(flatOptions.value, selectedIds);
        const newCheckedObject = getCheckedObject(flatOptions.value, childrenIds);
        const topLevelTags = getTopLevelOptionTags(selectOptions, flatOptions.value, newCheckedObject);
        const topLevelNodes = topLevelTags.map(tag => {
          return getNode(tag.id, flatOptions.value, props.options);
        });
        emit("update:modelValue", topLevelNodes);
      }

      return {
        tagsArray,
        handleSelectItem,
        checkedObject
      }
    }
  });
</script>
