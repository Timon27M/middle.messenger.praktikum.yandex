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

  private url: string;

  constructor(url: string) {
    this.url = url;
    this.httpTransport = new HTTPTransport();
  }

  getChats(): Promise<TChatStore[] | undefined> {
    return this.httpTransport.get(`${this.url}/chats`);
  }

  getUsersChat(id: string) {
    return this.httpTransport.get(`${this.url}/chats/${id}/users`);
  }

  create(data: TChatCreate) {
    return this.httpTransport.post(`${this.url}`, { data });
  }

  addUser(data: TChatAddAndDeleteUser) {
    return this.httpTransport.put(`${this.url}/users`, { data });
  }

  deleteUser(data: TChatAddAndDeleteUser) {
    return this.httpTransport.delete(`${this.url}/users`, { data });
  }

  deleteChat(data: TChatDelete) {
    return this.httpTransport.delete(`${this.url}`, { data });
  }
}

const chatApi = new ChatApi("https://ya-praktikum.tech/api/v2");

export default chatApi;
