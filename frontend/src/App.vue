<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useSendNameStore } from "../src/stores/store";

useSendNameStore();
</script>

<template>
  <RouterView />
</template>
