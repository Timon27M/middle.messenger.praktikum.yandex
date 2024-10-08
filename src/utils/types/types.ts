import { TRegisterData } from "../api/AuthApi";
import { TDataUpdatePassword } from "../api/UserApi";

export type TRegisterFormData = TRegisterData & {
  passwordAgain: string;
};

export type TDataFormUpdatePassword = TDataUpdatePassword & {
  newPasswordAgain: string;
};

export type Indexed<T = any> = {
  [key in string]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};
