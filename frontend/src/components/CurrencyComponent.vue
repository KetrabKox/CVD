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
    var today = new Date();
    var yesterday = new Date();

    // Zmiana daty o wskazaną wartość
    yesterday.setDate(yesterday.getDate() - 1);

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
    var d_e = String(today.getDate()).padStart(2, "0");
    var m_e = String(today.getMonth() + 1).padStart(2, "0");
    var y_e = today.getFullYear();

    var d_s = String(yesterday.getDate()).padStart(2, "0");
    var m_s = String(yesterday.getMonth() + 1).padStart(2, "0");
    var y_s = yesterday.getFullYear();

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
      let value_yesterday = response.data[0].rates[i].mid;
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