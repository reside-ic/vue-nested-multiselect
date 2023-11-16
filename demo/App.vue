<template>
  <div style="margin-top: 90vh; margin-bottom: 90vh;">
    <div style="margin: 2rem; width: 15rem;">
      <h2>Single Select</h2>
      <single-select :options="options" :modelValue="value" @update:modelValue="updateValue"/>
      <h2 style="margin-top: 3rem;">Multi Select</h2>
      <multi-select :options="options" :modelValue="multiValue" @update:modelValue="updateMultiValue"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SingleSelect from "../src/components/SingleSelect.vue";
  import MultiSelect from "../src/components/MultiSelect.vue";
  import { Option } from "../src/types";

  export default defineComponent({
    components: {
      SingleSelect,
      MultiSelect
    },
    setup() {
      const value = ref<string | null>(null);
      const updateValue = (node: Option) => {
        value.value = node.id
      };

      const multiValue = ref<string[] | null>(null);
      const updateMultiValue = (nodes: Option[]) => {
        multiValue.value = nodes.map(node => node.id)
      }
      const options: Option[] = [
        {
          id: "MWI_1",
          label: "Parent",
          children: [
            {
              id: "MWI_1_1",
              label: "ChildWithLongNameAndNoSpacesAtAll"
            },
            {
              id: "MWI_1_2",
              label: "Another child"
            },
            {
              id: "MWI_1_3",
              label: "ThirdChild",
              children: [
                {
                  id: "MWI_1_3_1",
                  label: "Nested child with long name"
                }
              ]
            },
          ]
        },
        {
          id: "MWI_2",
          label: "Parent with a long name and spaces",
          children: [
            {
              id: "MWI_2_1",
              label: "Different child"
            }
          ]
        }
      ]

      return {
        options,
        value,
        updateValue,
        multiValue,
        updateMultiValue
      }
    }
  })
</script>