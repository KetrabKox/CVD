import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useSendNameStore = defineStore("sendName", () => {
  const sendName = useLocalStorage("useName", {
    name: "USD",
  });

  return {
    sendName,
    setName(name: string) {
      sendName.value = { name };
    },
  };
});

export const useDateStore = defineStore("date", () => {
  return {
    adjustDates(start: Date, end: Date) {
      if (start.getDay() == 6) {
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
      } else if (start.getDay() == 0) {
        start.setDate(start.getDate() - 2);
        end.setDate(end.getDate() - 2);
      } else if (start.getDay() == 1) {
        end.setDate(end.getDate() - 3);
      }

      return { start, end };
    },
  };
});

export const useDateValueStore = defineStore("dateValue", () => {
  const dateRange = useLocalStorage<{ value: number; name: string }>(
    "useDate",
    {
      value: 7,
      name: "D",
    }
  );

  return {
    dateRange,
    // Metody do aktualizacji stanu sklepu
    setDateValue(value: number) {
      dateRange.value.value = value;
    },
    setDateName(name: string) {
      dateRange.value.name = name;
    },

    adjustDates(name: string, value: number, end: Date) {
      if (name === "D") {
        end.setDate(end.getDate() - value);
      } else if (name === "W") {
        end.setDate(end.getDate() - value * 7);
      } else if (name === "M") {
        end.setMonth(end.getMonth() - value);
      } else if (name === "Y") {
        end.setFullYear(end.getFullYear() - value);
      }
      return { end };
    },
  };
});
