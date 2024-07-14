import Main from "./src/pages/main/main";
import Profile from "./src/pages/profile/profile";
import DefaultChat from "./src/components/defaultChat/defaultChat.ts";
import Chat from "./src/components/chat/chat.ts";
import Login from "./src/pages/login/login.ts";
import Register from "./src/pages/register/register.ts";
import Error from "./src/pages/error/error.ts";
import ForgotPassword from "./src/pages/forgotPassword//forgotPassword.ts";

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
      } else if (url === "/forgot-password") {
        return ForgotPassword()
      } else {
        return Error("404", "Не туда попали");
      };

    })();
  }
});
