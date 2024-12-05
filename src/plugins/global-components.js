import AppAlert from "@/components/app/AppAlert.vue";
import AppCard from "@/components/app/AppCard.vue";
import AppGrid from "@/components/app/AppGrid.vue";
import AppModal from "@/components/app/AppModal.vue";
import AppPagination from "@/components/app/AppPagination.vue";

export default {
  install(app) {
    app.component("AppAlert", AppAlert); // 이름을 명시적으로 등록
    app.component("AppCard", AppCard);
    app.component("AppGrid", AppGrid);
    app.component("AppModal", AppModal);
    app.component("AppPagination", AppPagination);
  },
};
