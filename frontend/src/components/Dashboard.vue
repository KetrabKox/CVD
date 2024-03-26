<template>
  <HeaderDashboard />
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Line } from "vue-chartjs";
import HeaderDashboard from "../components/HeaderDashboard.vue";
import { useSendNameStore } from "../stores/sendName";
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
import { any } from "0g";

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
    // Pobranie danych z NBP
    var today = new Date();
    var last_week = new Date();
    last_week.setDate(last_week.getDate() - 7);

    // Zmiana daty z weekendów na dni powszednie
    if (today.getDay() == 6) {
      today.setDate(today.getDate() - 1);
      last_week.setDate(last_week.getDate() - 1);
    } else if (today.getDay() == 0) {
      today.setDate(today.getDate() - 2);
      last_week.setDate(last_week.getDate() - 2);
    } else if (today.getDay() == 1) {
      last_week.setDate(last_week.getDate() - 3);
    }

    // Formatowanie daty
    var d_e = String(today.getDate()).padStart(2, "0");
    var m_e = String(today.getMonth() + 1).padStart(2, "0");
    var y_e = today.getFullYear();

    var d_s = String(last_week.getDate()).padStart(2, "0");
    var m_s = String(last_week.getMonth() + 1).padStart(2, "0");
    var y_s = last_week.getFullYear();

    this.updateChartData(y_s, m_s, d_s, y_e, m_e, d_e); // Wywołujemy metodę updateChartData
  },

  data() {
    return {
      currencyWeek: [],
      chartData: {
        labels: [] as any,
        datasets: [
          {
            data: [] as any,
            backgroundColor: "transparent",
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
        },
      },
    };
  },
  methods: {
    async updateChartData(
      y_s: any,
      m_s: any,
      d_s: any,
      y_e: any,
      m_e: any,
      d_e: any
    ) {
      let response_week = await axios.get(
        `http://api.nbp.pl/api/exchangerates/tables/A/${
          y_s + "-" + m_s + "-" + d_s
        }/${y_e + "-" + m_e + "-" + d_e}`
      );

      this.currencyWeek = response_week.data
        .map((item: any) => {
          let found = item.rates.filter(
            (element: any) => element.code == this.nameStore.name
          );
          if (found.length > 0) {
            return {
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
    },
  },
});
</script>
