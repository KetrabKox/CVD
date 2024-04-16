<template>
  <div
    class="rounded-4 d-flex flex-row align-items-center justify-content-center"
  >
    <div class="name">{{ name }}</div>
    <div class="value ps-3">{{ value }}{{ percantege }}</div>
  </div>
</template>

<style scoped>
.rounded-4 {
  width: 15vw;
  height: 7.5vh;
  background-color: var(--secondary-color-text);
  box-shadow: 0 0.5rem var(--main-theme-color);
}
.name {
  font-size: 1.7rem;
  font-weight: bold;
}
.value {
  color: white;
  font-size: 1.7rem;
}
</style>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    percantege: {
      type: String,
    },
  },
};
</script>