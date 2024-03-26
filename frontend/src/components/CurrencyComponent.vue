<template>
  <div
    class="wrapper rounded-4 d-flex flex-column align-items-center z-1 overflow-scroll"
  >
    <CurrencyElement
      v-for="(currency, index) in currencyName"
      :key="index"
      :currencyName="currency"
      :currencyStock="currencyStock[index]"
      :currencyValue="currencyValue[index]"
    />
  </div>
</template>
<style scoped>
.wrapper {
  height: 80vh;
  width: 15vw;
  margin: 3rem 5% 0 auto;
  background-color: var(--secondary-theme-color);
  padding: 0.5rem 0 1rem 0;
}
</style>

<script lang="ts">
import CurrencyElement from "./CurrencyElement.vue";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  components: {
    CurrencyElement,
  },
  data() {
    return {
      currencyValue: [],
      currencyStock: [],
      currencyName: [],
    };
  },
  async mounted() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var today = new Date();

    // Zmiana daty z weekendów na dni powszednie
    if (today.getDay() == 6) {
      today.setDate(today.getDate() - 1);
      yesterday.setDate(yesterday.getDate() - 1);
    } else if (today.getDay() == 0) {
      today.setDate(today.getDate() - 2);
      yesterday.setDate(yesterday.getDate() - 2);
    } else if (today.getDay() == 1) {
      yesterday.setDate(yesterday.getDate() - 3);
    }

    // Formatowanie daty
    var dd2 = String(yesterday.getDate()).padStart(2, "0");
    var mm2 = String(yesterday.getMonth() + 1).padStart(2, "0");
    var yyyy2 = yesterday.getFullYear();

    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    // Pobieranie danych z API NBP
    let response_today = await axios.get(
      `http://api.nbp.pl/api/exchangerates/tables/A/${
        yyyy + "-" + mm + "-" + dd
      }/`
    );
    let response_yesterday = await axios.get(
      `http://api.nbp.pl/api/exchangerates/tables/A/${
        yyyy2 + "-" + mm2 + "-" + dd2
      }/`
    );
    // Obliczanie różnicy dla kazdej waluty
    for (let i = 0; i < response_today.data[0].rates.length; i++) {
      let currency = response_today.data[0].rates[i].code;
      let value_today = response_today.data[0].rates[i].mid.toFixed(3);
      let value_yesterday = response_yesterday.data[0].rates[i].mid;
      let stock = ((value_today - value_yesterday) / value_today) * 100;
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