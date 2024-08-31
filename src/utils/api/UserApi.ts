import HTTPTransport from "./HTTPTransport";

export type TUserProfile = {
  first_name?: string;
  second_name?: string;
  email?: string;
  display_name?: string;
  phone?: string;
  login?: string;
  avatar?: string;
  id?: number;
};

export type TDataUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TLogin = {
  login: string;
};

class UserApi {
  endpoint: string;

  httpTransport: HTTPTransport;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.httpTransport = new HTTPTransport();
  }

  updateUserProfile(data: TUserProfile) {
    return this.httpTransport.put(`${this.endpoint}/profile`, { data });
  }

  updateUserAvatar(data: FormData) {
    return this.httpTransport.put(`${this.endpoint}/profile/avatar`, { data });
  }

  updateUserPassword(data: TDataUpdatePassword) {
    return this.httpTransport.put(`${this.endpoint}/password`, { data });
  }

  searchUser(data: TLogin) {
    return this.httpTransport.post(`${this.endpoint}/search`, { data });
  }
}

const userApi = new UserApi("/user");

export default userApi;
