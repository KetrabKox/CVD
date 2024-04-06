import { defineStore } from "pinia";

export const useSendNameStore = defineStore({
  id: "sendName",
  state: () => ({
    name: "USD",
  }),
  actions: {
    setName(name: string) {
      this.$patch({ name });
    },
  },
});
