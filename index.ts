import Main from "./src/pages/main/main";
import Profile from './src/pages/profile/profile'

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
      } else if (url === '/profile') {

        return Profile()
      } else {
        return 'eee'
      }
      }
    )();
  }
});
