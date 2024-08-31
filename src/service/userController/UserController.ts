import userApi, { TLogin, TUserProfile } from "../../utils/api/UserApi";
import { store, TUserStore } from "../../utils/store/Store";
import { TDataFormUpdatePassword } from "../../utils/types/types";

class UserController {
  private userApi: typeof userApi;

  constructor() {
    this.userApi = userApi;
  }

  async updateUserProfile(data: TUserProfile): Promise<TUserStore | void> {
    await this.userApi
      .updateUserProfile(data)
      .then((res) => {
        store.set("currentUser", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async updateUserAvatar(data: FormData) {
    await this.userApi.updateUserAvatar(data).then((res) => {
      store.set("currentUser", res);
    });
  }

  async updateUserPassword(data: TDataFormUpdatePassword) {
    if (
      data.newPassword === data.newPasswordAgain &&
      data.oldPassword !== data.newPassword
    ) {
      const dataRequest = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await this.userApi.updateUserPassword(dataRequest).catch((err) => {
        console.log(err.message);
      });
    } else {
      alert("Ошибка: Пароли не совпадают");
      throw Error("Пароли не совпадают");
    }
  }

  async searchUser(data: TLogin): Promise<any> {
    return this.userApi.searchUser(data);
  }
}

const userController = new UserController();

export default userController;
