<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useSendNameStore } from "../src/stores/sendName";

useSendNameStore();
</script>

<template>
  <RouterView />
</template>
