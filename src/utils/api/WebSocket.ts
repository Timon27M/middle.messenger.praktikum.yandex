import Block from "../Block/Block";
import createMessageList from "../functions/createMessageList";
import { store } from "../store/Store";
import HTTPTransport from "./HTTPTransport";

class WebSocketChat {
  socket: WebSocket | undefined;

  create(chatId: number | undefined, userId: number | undefined, block: Block) {
    this.socket?.close();
    const httpTransport = new HTTPTransport();
    httpTransport
      .post(`/chats/token/${chatId}`)
      .then((res) => {
        const { token } = res;
        this.socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        );

        this.socket.addEventListener("open", () => {
          this.socket?.send(
            JSON.stringify({
              content: "0",
              type: "get old",
            })
          );
        });

        this.socket.addEventListener("message", (evt) => {
          let data;
          try {
            data = JSON.parse(evt.data);
          } catch (err) {
            console.log(err);
          }
          if (data.type === "message") {
            const { messageList } = store.getState();
            store.set("messageList", [...(messageList || []), data]);
          } else if (Array.isArray(data)) {
            store.set("messageList", data.reverse());
          }

          block.setProps({ messageList: createMessageList() });
        });

        this.socket.addEventListener("close", (evt) => {
          if (evt.wasClean) {
            console.log("Соединение закрыто чисто");
          } else {
            console.log("Соединение оборвалось");
          }
        });

        this.socket.addEventListener("error", (evt) => {
          console.log(`Error: ${evt}`);
        });
      })
      .catch((err) => {
        throw Error(`Ошибка: ${err.message}`);
      });
  }

  send(text: string): void {
    this.socket?.send(
      JSON.stringify({
        content: text,
        type: "message",
      })
    );
  }
}

const webSocket = new WebSocketChat();

export default webSocket;
