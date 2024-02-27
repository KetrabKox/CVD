<template>
  <div class="wrapper d-flex align-items-center flex-row">
    <DashboardComponent />
    <CurrencyComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrencyComponent from "../components/CurrencyComponent.vue";
import DashboardComponent from "../components/DashboardComponent.vue";

export default defineComponent({
  components: {
    CurrencyComponent,
    DashboardComponent,
  },
});
</script>

<style scoped>
</style>