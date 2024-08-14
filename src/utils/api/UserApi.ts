import HTTPTransport from "./HTTPTransport";

type TUserProfile = {
  first_name?: string;
  second_name?: string;
  email?: string;
  display_name?: string;
  phone?: string;
  login?: string;
  avatar?: string;
  id?: number;
};

type TDataUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

type TLogin = {
  login: string;
};

class UserApi {
  url: string;

  httpTransport: HTTPTransport;

  constructor(url: string) {
    this.url = url;
    this.httpTransport = new HTTPTransport();
  }

  updateUserProfile(data: TUserProfile) {
    return this.httpTransport.put(`${this.url}/user/profile`, { data });
  }

  updateUserAvatar(data: FormData) {
    return this.httpTransport.put(`${this.url}/user/profile/avatar`, { data });
  }

  updateUserPassword(data: TDataUpdatePassword) {
    return this.httpTransport.put(`${this.url}/user/password`, { data });
  }

  searchUser(data: TLogin) {
    return this.httpTransport.post(`${this.url}/user/search`, { data });
  }
}

const userApi = new UserApi("https://ya-praktikum.tech/api/v2");

export default userApi;
