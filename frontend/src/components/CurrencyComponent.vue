<template>
  <div class="wrapper rounded-4 d-flex flex-column align-items-center z-1">
    <CurrencyElement />
  </div>
</template>
<style scoped>
.wrapper {
  height: 80vh;
  width: 15vw;
  margin: 3rem 5% 0 auto;
  background-color: var(--secondary-theme-color);
  padding: 0.5rem;
}
</style>

<script lang="ts">
import CurrencyElement from "./CurrencyElement.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CurrencyElement,
  },
});
</script>