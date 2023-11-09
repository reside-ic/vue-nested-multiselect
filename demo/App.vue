<template>
  <div style="margin: 2rem; width: 15rem;">
    <h2>Single Select</h2>
    <single-select :options="options" :modelValue="value" @update:modelValue="updateValue"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SingleSelect from "../src/components/SingleSelect.vue";
  import { Option } from "../src/components/types";

  export default defineComponent({
    components: {
      SingleSelect
    },
    setup() {
      const value = ref<string | null>(null);
      const updateValue = (optionId: string) => {
        value.value = optionId
      }
      const options: Option[] = [
        {
          id: "MWI_1",
          label: "Parent",
          children: [
            {
              id: "MWI_1_1",
              label: "ChildWithLongNameAndNoSpaces"
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
        updateValue
      }
    }
  })
</script>