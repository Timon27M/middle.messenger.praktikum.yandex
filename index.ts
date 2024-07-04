import Main from "./src/pages/main/index";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  console.log(Main());

  if (root) {
    root.innerHTML = Main();
  }
});
