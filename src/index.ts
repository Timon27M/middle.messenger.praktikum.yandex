import { router } from "./utils/navigations/Router";
import Main from "./pages/main/main";
import { Profile } from "./pages/profile/profile";
// import { Chat } from "./components/chat/chat";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ForgotPassword } from "./pages/forgotPassword/forgotPassword";
import Chat from "./components/chat/chat";

document.addEventListener("DOMContentLoaded", () => {

  router
    .use("/", Login)
    .use("/sign-up", Register)
    .use("/settings", Profile)
    .use("/messenger", Main())
    .use("/forgot-password", ForgotPassword);

    // router.go("/messenger", {chatComponent: Chat()})

  router.start();
});

export default router;
