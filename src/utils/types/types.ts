import { TRegisterData } from "../api/AuthApi";
import { TDataUpdatePassword } from "../api/UserApi";

export type TRegisterFormData = TRegisterData & {
  passwordAgain: string;
};

export type TDataFormUpdatePassword = TDataUpdatePassword & {
  newPasswordAgain: string;
};
