<template>
  <button
    v-if="isActive"
    class="my-2 me-2 text-center d-inline-block position-relative border-0 text-decoration-none active"
    @click="saveDateRange"
  >
    {{ dateValue }}{{ dateName }}
  </button>
  <button
    v-else
    class="my-2 me-2 text-center d-inline-block position-relative border-0 text-decoration-none"
    @click="saveDateRange"
  >
    {{ dateValue }}{{ dateName }}
  </button>
</template>

<style scoped>
button {
  height: 2vh;
  width: 4vw;
  background-color: var(--secondary-theme-color);
  color: var(--main-text-color);
  border: none;
  transition: 0.3s;
  padding-bottom: 2.75vh;
}
button:hover {
  background-color: var(--secondary-color-text);
}

button::after,
.active::after {
  content: "";
  position: absolute;
  width: 50%;
  transform: scaleX(0);
  height: 3px;
  bottom: 0;
  left: 25%;
  background-color: white;
  transform-origin: center;
  transition: transform 0.25s ease-out;
  border-radius: 0 0 5px 5px;
}

.active::after {
  transform: scaleX(1);
}

button:active::after,
button:focus::after,
.active:active::after,
.active:focus::after {
  transform: scaleX(1);
}
</style>

<script lang="ts">
import { useDateValueStore } from "../stores/store";
export default {
  props: {
    dateValue: {
      type: Number,
      required: true,
    },
    dateName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    saveDateRange() {
      const dateValueStore = useDateValueStore();
      dateValueStore.dateRange.value = this.dateValue;
      dateValueStore.dateRange.name = this.dateName;
    },
  },
};
</script>