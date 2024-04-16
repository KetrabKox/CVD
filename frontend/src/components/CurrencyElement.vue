<template>
  <button
    class="wrap rounded-4 mt-3 d-flex flex-row p-0"
    @click="sendCurrencyName"
  >
    <div class="h-100 rounded-start-4">
      <div class="currency value h-50 w-100 ps-2">{{ currencyValue }}</div>
      <div class="currency name h-50 w-100 ps-2">{{ currencyName }}</div>
    </div>
    <div
      class="currency stock h-100 w-100 rounded-end-4 stock-down"
      v-if="currencyStock < 0"
    >
      <i class="bi bi-caret-down-fill"></i>
      {{ absoluteStock }} %
    </div>
    <div
      class="currency stock h-100 w-100 rounded-end-4 stock-up"
      v-else-if="currencyStock >= 0"
    >
      <i class="bi bi-caret-up-fill"></i>
      {{ currencyStock.toFixed(3) }} %
    </div>
  </button>
</template>

<style scoped>
.currency {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
  transition: 0.3s;
}
button:active {
  box-shadow: 0 0.3rem var(--main-theme-color);
  transform: translateY(4px);
}
button:focus {
  transform: translateY(4px);
  box-shadow: 0 0.3rem var(--main-theme-color);
  background-color: var(--main-color-text);
}
.currency.value {
  border-top-left-radius: 15px;
  font-size: 1.7rem;
  font-weight: bold;
}
.currency.name {
  border-bottom-left-radius: 15px;
  font-size: 1.2rem;
  font-weight: 100;
}
.currency.stock {
  font-size: 1.7rem;
  font-weight: 500;
}
.stock-down {
  color: #bd0000;
}
.stock-up {
  color: #25bc25;
}
</style>

<script lang="ts">
import { useSendNameStore } from "../stores/store";

export default {
  setup() {
    const nameStore = useSendNameStore();
    return { nameStore };
  },

  props: {
    currencyValue: {
      type: Number,
      required: true,
    },
    currencyName: {
      type: String,
      required: true,
    },
    currencyStock: {
      type: Number,
      required: true,
    },
  },
  // Obliczenie wartości bezwzględnej kursu waluty
  computed: {
    absoluteStock() {
      return Math.abs(parseFloat(this.currencyStock.toFixed(3)));
    },
  },
  methods: {
    // Przekazanie nazwy do store
    sendCurrencyName() {
      this.nameStore.setName(this.currencyName);
    },
  },
};
</script>