import HTTPTransport from "./HTTPTransport";

export type TRegisterData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type TLoginData = {
  login: string;
  password: string;
};

class AuthApi {
  httpTransport: HTTPTransport;

  url: string;

  constructor(url: string) {
    this.httpTransport = new HTTPTransport();
    this.url = url;
  }

  register(data: TRegisterData) {
    return this.httpTransport.post(`${this.url}/auth/signup`, { data });
  }

  login(data: TLoginData) {
    return this.httpTransport.post(`${this.url}/auth/signin`, { data });
  }

  getUser() {
    return this.httpTransport.get(`${this.url}/auth/user`);
  }

  logout() {
    return this.httpTransport.post(`${this.url}/auth/logout`);
  }
}

const authApi = new AuthApi("https://ya-praktikum.tech/api/v2");

export default authApi;
