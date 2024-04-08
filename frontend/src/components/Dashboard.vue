<template>
  <HeaderDashboard />
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { Line } from "vue-chartjs";
import HeaderDashboard from "../components/HeaderDashboard.vue";
import { useSendNameStore, useDateStore } from "../stores/store";
import axios from "axios";

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
    return { nameStore };
  },

  components: {
    Line,
    HeaderDashboard,
  },

  async mounted() {
    // Pobranie danych z NBP API
    this.updateChartData(); // Wywołujemy metodę updateChartData
  },

  data() {
    return {
      nameStore: useSendNameStore(),
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
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            grid: {
              color: "transparent",
            },
            ticks: {
              color: "gray",
            },
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: "#ffffff",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `${this.currentName}/PLN`,
            color: "#ffffff",
            font: {
              size: 20,
            },
          },
        },
      },
    };
  },
  methods: {
    async updateChartData() {
      const { start, end } = useDateStore().adjustDates(new Date(), new Date());

      // Zmiana daty o wskazaną wartość
      end.setDate(end.getDate() - 7);

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
  },
});
</script>
