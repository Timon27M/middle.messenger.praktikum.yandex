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
    (function () {
      if (url === "/main") {
        root.append(Main(DefaultChat).getContent());
      } else if (url === "/main/chat") {
        root.append(Main(Chat).getContent());
      } else if (url === "/profile") {
        root.append(Profile().getContent());
      } else if (url === "/login") {
        root.append(Login().getContent());
      } else if (url === "/register") {
        root.append(Register().getContent());
      } else if (url === "/forgot-password") {
        root.append(ForgotPassword().getContent());
      } else {
        root.append(Error({
          status: "404",
          textError: "Не туда попали",
        }).getContent());
      }
    })();
  }
});
