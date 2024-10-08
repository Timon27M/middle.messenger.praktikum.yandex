import DefaultChat from "../../components/defaultChat/defaultChat";
import authApi, { TRegisterData, TLoginData } from "../../utils/api/AuthApi";
import { router } from "../../utils/navigations/Router";
import { store } from "../../utils/store/Store";
import { TRegisterFormData } from "../../utils/types/types";

class AuthController {
  private authApi: typeof authApi;

  constructor() {
    this.authApi = authApi;
  }

  register(formData: TRegisterFormData) {
    if (formData.password === formData.passwordAgain) {
      const newData = {
        first_name: formData.first_name,
        second_name: formData.second_name,
        login: formData.login,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      this.authApi
        .register(newData as TRegisterData)
        .then(() => {
          router.go("/messenger");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Пароли не совпадают");
      throw Error("Пароли не совпадают");
    }
  }

  login(formData: TLoginData) {
    this.authApi
      .login(formData)
      .then(() => {
        router.go("/messenger");
      })
      .catch((err) => console.log(err.message));
  }

  async getUser(pathname?: string, props?: any) {
    await this.authApi.getUser().then((res) => {
      if (pathname) {
        router.go(pathname, props);
      }
      store.set("currentUser", res);
    });
  }

  logout() {
    this.authApi
      .logout()
      .then(() => {
        router.go("/");

        store.set("currentUser", undefined);
        store.set("chatList", []);
        store.set("messageList", []);
        store.set("chatComponentList", []);
        store.set("currentChat", DefaultChat());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

const authController = new AuthController();

export default authController;
