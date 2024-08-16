import HTTPTransport from "./HTTPTransport";

class ChatApi {
  httpTransport: HTTPTransport;

  private url: string;

  constructor(url: string) {
    this.url = url;
    this.httpTransport = new HTTPTransport();
  }

  getUsersChat(id: string) {
    return this.httpTransport.get(`${this.url}/chats/${id}/users`);
  }
}

const chatApi = new ChatApi("https://ya-praktikum.tech/api/v2");

export default chatApi;
