<template>
  <hello-world/>
</template>

<script lang="ts">
  import HelloWorld from "../src/components/Component.vue";
  import { defineComponent } from "vue";

  export default defineComponent({
    components: { HelloWorld }
  });
</script>