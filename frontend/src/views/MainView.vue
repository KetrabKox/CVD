<template>
  <Header />
  <div class="wrapper d-flex align-items-center flex-row">
    <DashboardComponent />
    <CurrencyComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrencyComponent from "../components/CurrencyComponent.vue";
import DashboardComponent from "../components/DashboardComponent.vue";
import Header from "../components/Header.vue";

export default defineComponent({
  components: {
    CurrencyComponent,
    DashboardComponent,
    Header,
  },
});
</script>

<style scoped>
</style>