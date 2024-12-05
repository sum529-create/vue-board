export default {
  install(app, option) {
    const person = {
      name: "sumin",
      say() {
        alert(this.name);
      },
      ...option,
    };
    app.config.globalProperties.$person = person;
    // script setup안에서 사용가능토록함 [(vue lifeCycle) setup함수 이전에 불러오기때문]
    app.provide("person", person);
  },
};
