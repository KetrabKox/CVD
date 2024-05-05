<template>
  <div
    class="wrapper rounded-4 d-flex flex-column align-items-center z-1 overflow-scroll"
  >
    <div class="d-flex justify-content-around flex-row">
      <button class="sort" @click="sortAsc" v-if="!isClickedAsc">
        <i class="bi bi-sort-down"></i>
      </button>
      <button class="sort clicked" @click="resetSort" v-else>
        <i class="bi bi-sort-down"></i>
      </button>
      <button class="sort" @click="sortDesc" v-if="!isClickedDesc">
        <i class="bi bi-sort-up"></i>
      </button>
      <button class="sort clicked" @click="resetSort" v-else>
        <i class="bi bi-sort-up"></i>
      </button>
    </div>

    <CurrencyElement
      v-for="(currency, index) in sortedCurrencies"
      :key="index"
      :currencyName="currency.name"
      :currencyStock="currency.stock"
      :currencyValue="currency.value"
      :whichClicked="nameStore.sendName.name"
    />
  </div>
</template>
<style scoped>
.wrapper {
  height: 82.5vh;
  width: 15vw;
  margin: 4rem 5% 0 auto;
  background-color: var(--secondary-theme-color);
  padding: 0.5rem 0 1rem 0;
}
.sort {
  height: 5vh;
  width: 4vw;
  font-size: 1.5rem;
  background-color: var(--secondary-color-text);
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  box-shadow: 0 0.3rem var(--main-theme-color);
  transition: 0.3s;
}

.sort:focus,
.sort.clicked {
  transform: translateY(2px);
  box-shadow: 0 0.2rem var(--main-theme-color);
  background-color: var(--main-color-text);
}
</style>

<script lang="ts">
import CurrencyElement from "./CurrencyElement.vue";
import { defineComponent } from "vue";
import axios from "axios";
import { useDateStore, useSendNameStore } from "../stores/store";

export default defineComponent({
  components: {
    CurrencyElement,
  },
  setup() {
    const nameStore = useSendNameStore();
    return { nameStore };
  },
  data() {
    return {
      currencyValue: [],
      currencyStock: [],
      currencyName: [],
      isSorted: false,
      originalSort: [] as any[],
      isClickedAsc: false,
      isClickedDesc: false,
      nameStore: useSendNameStore(),
    };
  },
  computed: {
    sortedCurrencies() {
      const currencies = this.currencyName.map((name, index) => ({
        name,
        stock: this.currencyStock[index],
        value: this.currencyValue[index],
      }));
      if (this.originalSort.length === 0) {
        return currencies;
      } else {
        return currencies.sort((a, b) =>
          this.isSorted ? a.stock - b.stock : b.stock - a.stock
        );
      }
    },
  },
  methods: {
    sortAsc() {
      this.isClickedAsc = true;
      this.isClickedDesc = false;
      this.isSorted = false;
      this.originalSort = this.sortedCurrencies;
      localStorage.setItem("isSorted", "false");
      localStorage.setItem("isClickedAsc", "true");
      localStorage.setItem("isClickedDesc", "false");
      localStorage.setItem("originalSort", JSON.stringify(this.originalSort));
    },
    sortDesc() {
      this.isClickedAsc = false;
      this.isClickedDesc = true;
      this.isSorted = true;
      this.originalSort = this.sortedCurrencies;
      localStorage.setItem("isSorted", "true");
      localStorage.setItem("isClickedAsc", "false");
      localStorage.setItem("isClickedDesc", "true");
      localStorage.setItem("originalSort", JSON.stringify(this.originalSort));
    },
    resetSort() {
      this.isClickedAsc = false;
      this.isClickedDesc = false;
      this.originalSort = [];
      localStorage.setItem("isClickedAsc", "false");
      localStorage.setItem("isClickedDesc", "false");
      localStorage.setItem("originalSort", JSON.stringify(this.originalSort));
    },
  },
  async mounted() {
    const { start, end } = useDateStore().adjustDates(new Date(), new Date());

    this.isSorted = localStorage.getItem("isSorted") === "true";
    this.isClickedAsc = localStorage.getItem("isClickedAsc") === "true";
    this.isClickedDesc = localStorage.getItem("isClickedDesc") === "true";
    this.originalSort = JSON.parse(
      localStorage.getItem("originalSort") || "[]"
    );

    // Zmiana daty o wskazaną wartość
    end.setDate(end.getDate() - 1);

    // Formatowanie daty
    var d_e = String(start.getDate()).padStart(2, "0");
    var m_e = String(start.getMonth() + 1).padStart(2, "0");
    var y_e = start.getFullYear();

    var d_s = String(end.getDate()).padStart(2, "0");
    var m_s = String(end.getMonth() + 1).padStart(2, "0");
    var y_s = end.getFullYear();

    let response = await axios.get(
      `http://api.nbp.pl/api/exchangerates/tables/A/${
        y_s + "-" + m_s + "-" + d_s
      }/${y_e + "-" + m_e + "-" + d_e}`
    );

    // Obliczanie różnicy dla kazdej waluty
    for (
      let i = 0;
      i < response.data[response.data.length - 1].rates.length;
      i++
    ) {
      let currency = response.data[response.data.length - 1].rates[i].code;
      let value_today =
        response.data[response.data.length - 1].rates[i].mid.toFixed(3);
      let value_end = response.data[0].rates[i].mid;
      let stock = ((value_today - value_end) / value_today) * 100;
      if (value_today == 0) {
        stock = 0;
      }
      this.currencyStock.push(stock as never);
      this.currencyValue.push(value_today as never);
      this.currencyName.push(currency as never);
    }
  },
});
</script>