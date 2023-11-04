<template>
  <div style="margin: 2rem; width: 15rem;">
    <h2>Single Select</h2>
    <single-select :options="options" :modelValue="value" @update:modelValue="updateValue"/>
    <h2 style="margin-top: 3rem;">Multi Select</h2>
    <multi-select :options="options" :modelValue="multiValue" @update:modelValue="updateMultiValue"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SingleSelect from './components/SingleSelect.vue';
  import MultiSelect from './components/MultiSelect.vue';
  import { Option } from "./components/types";

  export default defineComponent({
    components: {
      SingleSelect,
      MultiSelect
    },
    setup() {
      const value = ref<string | null>(null);
      const updateValue = (optionId: string) => {
        value.value = optionId
      };

      const multiValue = ref<string[] | null>(null);
      const updateMultiValue = (optionId: string[]) => {
        multiValue.value = optionId
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
                  label: "UltimateChild",
                  children: [
                    {
                      id:"MWI_1_3_1_4",
                      label: "SurpriseChildWoohoo"
                    }
                  ]
                },
                {
                  id: "MWI_1_3_2",
                  label: "UltimateChild2"
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
        updateValue,
        multiValue,
        updateMultiValue
      }
    }
  })
</script>