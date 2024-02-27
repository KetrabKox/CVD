<template>
  <div class="wrapper d-flex align-items-center flex-column">
    <Header />
    <div class="dashboard-wrap rounded-4">
      <Dashboard />
    </div>
  </div>
</template>

<style scoped>
.wrapper,
.dashboard-wrap {
  margin: 1rem 5% 0 auto;
}
.dashboard-wrap {
  height: 75vh;
  width: 65vw;
  background-color: var(--secondary-theme-color);
  padding: 0.5rem;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import Dashboard from "./Dashboard.vue";

export default defineComponent({
  components: {
    Header,
    Dashboard,
  },
});
</script>