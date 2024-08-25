import { TChatStore } from "../store/Store";
import HTTPTransport from "./HTTPTransport";

export type TChatCreate = {
  title: string;
};

export type TChatAddAndDeleteUser = {
  users: number[];
  chatId: number;
};

export type TChatDelete = {
  chatId: number;
};

class ChatApi {
  httpTransport: HTTPTransport;

  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.httpTransport = new HTTPTransport();
  }

  getChats(): Promise<TChatStore[] | undefined> {
    return this.httpTransport.get(`${this.endpoint}`);
  }

  getUsersChat(id: string) {
    return this.httpTransport.get(`${this.endpoint}/${id}/users`);
  }

  create(data: TChatCreate) {
    return this.httpTransport.post(`${this.endpoint}`, { data });
  }

  addUser(data: TChatAddAndDeleteUser) {
    return this.httpTransport.put(`${this.endpoint}/users`, { data });
  }

  deleteUser(data: TChatAddAndDeleteUser) {
    return this.httpTransport.delete(`${this.endpoint}/users`, { data });
  }

  deleteChat(data: TChatDelete) {
    return this.httpTransport.delete(`${this.endpoint}`, { data });
  }
}

const chatApi = new ChatApi("/chats");

export default chatApi;
