import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alerts: [],
  }),
  getters: {},
  actions: {
    vAlert(message, type = "error") {
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.alerts.splice(0, 1);
      }, 2000);
    },
  },
});
