import Main from "./src/pages/main/main";
import Profile from "./src/pages/profile/profile";
import DefaultChat from "./src/components/defaultChat/defaultChat.ts";
import Chat from "./src/components/chat/chat.ts";
import Login from "./src/pages/login/login.ts";
import Register from "./src/pages/register/register.ts";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  const url = window.location.pathname;

  if (url === "/") {
    window.location.pathname = "/main/chat";
  }

  if (root) {
    root.innerHTML = (function () {
      if (url === "/main") {
        return Main(DefaultChat);
      } else if (url === "/main/chat") {
        return Main(Chat);
      } else if (url === "/profile") {
        return Profile();
      } else if (url === "/login") {
        return Login();
      } else if (url === "/register") {
        return Register();
      } else {
        return "";
      }
    })();
  }
});
