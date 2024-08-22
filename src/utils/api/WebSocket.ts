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
      .post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`)
      .then((res) => {
        const { token } = res;
        this.socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        );

        console.log(this.socket);

        this.socket.addEventListener("open", () => {
          console.log("qwe");
          this.socket?.send(
            JSON.stringify({
              content: "0",
              type: "get old",
            })
          );
        });

        this.socket.addEventListener("message", (evt) => {
          const data = JSON.parse(evt.data);
          console.log(evt);
          if (data.type === "message") {
            const { messageList } = store.getState();
            store.set("messageList", [...(messageList || []), data]);
          } else if (Array.isArray(data)) {
            store.set("messageList", data.reverse());
          }

          block.setProps({ messageList: createMessageList() });
          console.log(createMessageList());

          console.log(store.getState());
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
