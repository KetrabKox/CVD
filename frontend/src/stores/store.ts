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
