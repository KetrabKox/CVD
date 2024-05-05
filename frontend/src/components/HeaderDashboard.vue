<template>
  <div class="header-wrap rounded-4 m-3 d-flex justify-content-around">
    <HeaderComponent :name="'Open'" :value="openValue" />
    <HeaderComponent :name="'Close'" :value="closeValue" />
    <div v-if="currentValue < 0">
      <HeaderComponent
        :name="'Change'"
        :value="currentValue"
        :percantege="'%'"
      />
    </div>
    <div v-if="currentValue >= 0">
      <HeaderComponent
        :name="'Change'"
        :value="currentValue"
        :percantege="'%'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./HeaderComponent.vue";
import axios from "axios";
import {
  useSendNameStore,
  useDateStore,
  useDateValueStore,
} from "../stores/store";

export default defineComponent({
  data() {
    return {
      openValue: 0,
      closeValue: 0,
      currentValue: 0 as any,
    };
  },

  setup() {
    const nameStore = useSendNameStore();
    const dateStore = useDateValueStore();
    return { nameStore, dateStore };
  },

  components: {
    HeaderComponent,
  },

  async mounted() {
    this.updateValues();
  },

  methods: {
    async updateValues() {
      // Pobranie zakresu dat z localStorage
      const dateRange = JSON.parse(localStorage.getItem("useDate") || "{}");
      const dateName = dateRange.name;
      const dateValue = dateRange.value;
      console.log(dateName, dateValue);

      let { start, end } = useDateStore().adjustDates(new Date(), new Date());
      // Zmiana daty o wskazaną wartość
      end = useDateValueStore().adjustDates(dateName, dateValue, end).end;

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

      // Przypiswanie wartości do zmiennych w zależności od nameStore.name

      let foundOpen = response.data[0].rates.filter(
        (element: any) => element.code == this.nameStore.sendName.name
      );
      let foundClose = response.data[response.data.length - 1].rates.filter(
        (element: any) => element.code == this.nameStore.sendName.name
      );

      this.openValue = parseFloat(foundOpen[0].mid.toFixed(3));
      this.closeValue = parseFloat(
        foundClose[foundClose.length - 1].mid.toFixed(3)
      );
      this.currentValue = (
        ((this.closeValue - this.openValue) / this.openValue) *
        100
      ).toFixed(2);
    },
  },
  watch: {
    nameStore: {
      handler() {
        this.updateValues();
      },
      deep: true,
    },
    dateStore: {
      handler() {
        this.updateValues();
      },
      deep: true,
    },
  },
});
</script>
