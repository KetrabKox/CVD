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
