<template>
  <div style="margin-top: 90vh; margin-bottom: 90vh;">
    <div style="margin: 2rem; width: 15rem;">
      <h2>Single Select With Nesting</h2>
      <single-select :options="options" :modelValue="value" @update:modelValue="updateValue"/>
      <h2 style="margin-top: 3rem;">Single Select Without Nesting</h2>
      <single-select :options="nonNestedOptions" :modelValue="nonNestedvalue" @update:modelValue="updateNonNestedValue"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import SingleSelect from "../src/components/SingleSelect.vue";
  import { Option } from "../src/types.ts";

  export default defineComponent({
    components: {
      SingleSelect
    },
    setup() {
      const value = ref<string | null>(null);
      const updateValue = (node: Option) => {
        value.value = node.id
      };

      const nonNestedvalue = ref<string | null>(null);
      const updateNonNestedValue = (node: Option) => {
        nonNestedvalue.value = node.id
      };

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

      const nonNestedOptions: Option[] = [
        {
          id: "MWI_1",
          label: "Option1WithLongNameAndNoSpaces",
        },
        {
          id: "MWI_2",
          label: "Option 2 with a long name and spaces",
        },
        {
          id: "MWI_3",
          label: "Option 3",
        },
      ]

      return {
        options,
        value,
        updateValue,
        nonNestedOptions,
        nonNestedvalue,
        updateNonNestedValue,
      }
    }
  });
</script>