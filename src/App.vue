<template>
  <div style="margin: 2rem; width: 15rem;">
    <h2>Single Select</h2>
    <single-select :options="options" :modelValue="value" @update:modelValue="updateValue"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SingleSelect from './components/SingleSelect.vue';
  import { Option } from "./components/types";

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
          label: "Northern",
          children: [
            {
              id: "MWI_1_1",
              label: "NothernChild1"
            },
            {
              id: "MWI_1_2",
              label: "NothernChild2"
            },
            {
              id: "MWI_1_3",
              label: "NothernChild3",
              children: [
                {
                  id: "MWI_1_3_1",
                  label: "UltimateChild"
                }
              ]
            },
          ]
        },
        {
          id: "MWI_2",
          label: "Central",
          children: [
            {
              id: "MWI_2_1",
              label: "CentralChild"
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