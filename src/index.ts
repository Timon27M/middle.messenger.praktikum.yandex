import { router } from "./utils/navigations/Router";
import { Main } from "./pages/main/main";
import { Profile } from "./pages/profile/profile";
// import { Chat } from "./components/chat/chat";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ForgotPassword } from "./pages/forgotPassword/forgotPassword";
import Chat from "./components/chat/chat";
// import { Error } from "./pages/error/error";
document.addEventListener("DOMContentLoaded", () => {
  // const root = document.querySelector("#app");

  // const url = window.location.pathname;

  // if (url === "/") {
  //   window.location.pathname = "/main/chat";
  // }

  // if (root) {
  //   (function () {
  //     if (url === "/main") {
  //       root.append(Main(DefaultChat).getContent());
  //     } else if (url === "/main/chat") {
  //       root.append(Main(Chat).getContent());
  //     } else if (url === "/profile") {
  //       root.append(Profile().getContent());
  //     } else if (url === "/login") {
  //       root.append(Login().getContent());
  //     } else if (url === "/register") {
  //       root.append(Register().getContent());
  //     } else if (url === "/forgot-password") {
  //       root.append(ForgotPassword().getContent());
  //     } else {
  //       root.append(
  //         Error({
  //           status: "404",
  //           textError: "Не туда попали",
  //         }).getContent(),
  //       );
  //     }
  //   }());
  // }

  router
    .use("/", Login)
    .use("/sign-up", Register)
    .use("/settings", Profile)
    .use("/messenger", Main)
    .use("/forgot-password", ForgotPassword);

  router.go("/messenger", Chat());
  router.start();
});

export default router;
