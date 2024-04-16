<template>
  <HeaderDashboard />
  <div class="d-flex">
    <DateRange :dateValue="5" :dateName="'D'" />
    <DateRange :dateValue="3" :dateName="'W'" />
    <DateRange :dateValue="1" :dateName="'M'" />
    <DateRange :dateValue="3" :dateName="'M'" />
  </div>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Line } from "vue-chartjs";
import HeaderDashboard from "../components/HeaderDashboard.vue";
import DateRange from "./DateRangeComponent.vue";
import {
  useSendNameStore,
  useDateStore,
  useDateValueStore,
} from "../stores/store";
import axios from "axios";
import { getChartOptions } from "../assets/chartOptions";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  setup() {
    const nameStore = useSendNameStore();
    const dateStore = useDateValueStore();
    return { nameStore, dateStore };
  },

  components: {
    Line,
    HeaderDashboard,
    DateRange,
  },

  async mounted() {
    // Pobranie danych z NBP API
    this.updateChartData(); // Wywołujemy metodę updateChartData
  },

  data() {
    return {
      nameStore: useSendNameStore(),
      dateStore: useDateValueStore(),
      currentName: "",
      currencyWeek: [],
      chartData: {
        labels: [] as any,
        datasets: [
          {
            data: [] as any,
            backgroundColor: "red",
            borderColor: "#f6b17a",
            pointRadius: 0,
          },
        ],
      },
      chartOptions: getChartOptions(String(this.currentName)),
    };
  },
  methods: {
    async updateChartData() {
      // Pobranie zakresu dat z localStorage
      const dateRange = JSON.parse(localStorage.getItem("useDate") || "{}");
      const dateName = dateRange.name;
      const dateValue = dateRange.value;

      // Pobranie aktualnego zakresu dat
      const { start, end } = useDateStore().adjustDates(new Date(), new Date());

      // Zmiana daty o wskazaną wartość
      if (dateName === "D") {
        end.setDate(end.getDate() - dateValue);
      } else if (dateName === "W") {
        end.setDate(end.getDate() - dateValue * 7);
      } else if (dateName === "M") {
        end.setMonth(end.getMonth() - dateValue);
      }

      // Formatowanie daty
      var d_e = String(start.getDate()).padStart(2, "0");
      var m_e = String(start.getMonth() + 1).padStart(2, "0");
      var y_e = start.getFullYear();

      var d_s = String(end.getDate()).padStart(2, "0");
      var m_s = String(end.getMonth() + 1).padStart(2, "0");
      var y_s = end.getFullYear();

      let response_week = await axios.get(
        `http://api.nbp.pl/api/exchangerates/tables/A/${
          y_s + "-" + m_s + "-" + d_s
        }/${y_e + "-" + m_e + "-" + d_e}`
      );

      this.currencyWeek = response_week.data
        .map((item: any) => {
          let found = item.rates.filter(
            (element: any) => element.code == this.nameStore.sendName.name
          );
          if (found.length > 0) {
            return {
              name: found[0].code,
              date: item.effectiveDate,
              mid: found[0].mid,
            };
          }
        })
        .filter(Boolean); // Usuń undefined wartości

      // Aktualizujemy labels i data
      this.chartData = {
        ...this.chartData,
        labels: this.currencyWeek.map((item: any) => item.date),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: this.currencyWeek.map((item: any) => item.mid),
          },
        ],
      };
      if (this.currencyWeek.length > 0) {
        this.chartOptions.plugins.title.text =
          (this.currencyWeek[0] as any).name + "/PLN";
      }
    },
  },
  // Obserwujemy zmiany w nameStore i aktualizujemy wykres
  watch: {
    nameStore: {
      handler() {
        this.updateChartData();
      },
      deep: true,
    },
    dateStore: {
      handler() {
        this.updateChartData();
      },
      deep: true,
    },
  },
});
</script>
