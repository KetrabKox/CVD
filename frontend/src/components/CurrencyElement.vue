<template>
  <button class="wrap rounded-4 mt-3">button</button>
</template>

<style scoped>
button {
  height: 8vh;
  width: 13vw;
  background-color: var(--secondary-color-text);
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  box-shadow: 0 0.5rem var(--main-theme-color);
}
button:active {
  box-shadow: 0 0.3rem var(--main-theme-color);
  transform: translateY(4px);
}
</style>