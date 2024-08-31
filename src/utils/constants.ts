export const regexps: Record<string, string> = {
  first_name: "^[A-ZА-Я][a-zA-Zа-яА-Я]+$",
  second_name: "^[A-ZА-Я][a-zA-Zа-яА-Я]+$",
  display_name: "^[A-ZА-Я][a-zA-Zа-яА-Я]+$",
  login: "^(?=.{3,20}$)([A-Za-z0-9-_]*[A-Za-z-_][A-Za-z0-9-_]*)$",
  email: "^[A-Za-z0-9-_]+@+[A-Za-z]+.+[a-zA-Z]+$",
  password: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  newPassword: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  newPasswordAgain: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  oldPassword: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  passwordAgain: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  phone: "([+7|7|8]+[0-9]{10})$",
  message: "^.*\\S.*$",
};

export const BASE_URL = "https://ya-praktikum.tech/api/v2";
