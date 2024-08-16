import userApi, { TLogin, TUserProfile } from "../../utils/api/UserApi";
import { TDataFormUpdatePassword } from "../../utils/types/types";

class UserController {
  userApi: typeof userApi;

  constructor() {
    this.userApi = userApi;
  }

  updateUserProfile(data: TUserProfile) {
    this.userApi.updateUserProfile(data).catch((err) => {
      console.log(err.message);
    });
  }

  updateUserAvatar(data: FormData) {
    this.userApi.updateUserAvatar(data);
  }

  updateUserPassword(data: TDataFormUpdatePassword) {
    if (
      data.newPassword === data.newPasswordAgain &&
      data.oldPassword !== data.newPassword
    ) {
      this.userApi.updateUserPassword(data).catch((err) => {
        console.log(err.message);
      });
    } else {
        alert("Ошибка: Пароли не совпадают")
        throw Error("Пароли не совпадают")
    }
  }

  searchUser(data: TLogin) {
    this.userApi.searchUser(data);
  }
}

const userController = new UserController();

export default userController;
