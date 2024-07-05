import Main from "./src/pages/main/main";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  const url = window.location.pathname

  if (url === '/') {
     window.location.pathname = '/main'
  }

  if (root) {
    root.innerHTML = (
     function () {
      if (url === '/main') {
        return Main()
      } else {
        return 'eee'
      }
      }
    )();
  }
});
