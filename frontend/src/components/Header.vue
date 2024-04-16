<template>
  <div class="wrapped d-flex align-items-center flex-row">
    <div class="profil-page rounded-circle"></div>
    <div class="header">
      <router-link to="/">
        <a class="dashboard text-center mt-2">Dashboard</a>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.profil-page {
  height: 4rem;
  width: 4rem;
  background-color: var(--secondary-theme-color);
}
a {
  color: var(--main-color-text);
  transition: 0.3s;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.7rem;
}
a:hover {
  font-size: 1.75rem;
  transition: 0.3s;
}
</style>