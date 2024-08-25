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

  endpoint: string;

  constructor(endpoint: string) {
    this.httpTransport = new HTTPTransport();
    this.endpoint = endpoint;
  }

  register(data: TRegisterData) {
    return this.httpTransport.post(`${this.endpoint}/signup`, { data });
  }

  login(data: TLoginData) {
    return this.httpTransport.post(`${this.endpoint}//signin`, { data });
  }

  getUser() {
    return this.httpTransport.get(`${this.endpoint}/user`);
  }

  logout() {
    return this.httpTransport.post(`${this.endpoint}/logout`);
  }
}

const authApi = new AuthApi("/auth");

export default authApi;
