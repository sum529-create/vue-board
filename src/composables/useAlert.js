import { ref } from "vue";

// data_alert
const alerts = ref([]);
export function useAlert() {
  // mehtod_alert
  const vAlert = (message, type = "error") => {
    alerts.value.push({ message, type });
    setTimeout(() => {
      alerts.value.splice(0, 1);
    }, 2000);
  };
  return { alerts, vAlert };
}
