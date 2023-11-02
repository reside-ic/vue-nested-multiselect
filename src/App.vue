<template>
  <div style="margin: 2rem; width: 15rem;">
    <h2>Single Select</h2>
    <single-select :options="options"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SingleSelect from './components/SingleSelect.vue';
  import { Option } from "./components/types";

  export default defineComponent({
    components: {
      SingleSelect
    },
    setup() {
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
        options
      }
    }
  })
</script>