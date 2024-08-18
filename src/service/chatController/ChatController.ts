import chatApi, {
  TChatAddAndDeleteUser,
  TChatCreate,
  TChatDelete,
} from "../../utils/api/ChatApi";
import { store, TChatStore } from "../../utils/store/Store";

class ChatController {
  private chatApi: typeof chatApi;

  constructor() {
    this.chatApi = chatApi;
  }

  async getChats() {
    await this.chatApi
      .getChats()
      .then((res) => {
        store.set("chatList", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getUsersChat(id: string) {
    this.chatApi.getUsersChat(id);
  }

  create(data: TChatCreate) {
    this.chatApi.create(data);
  }

  addUser(data: TChatAddAndDeleteUser) {
    this.chatApi.addUser(data);
  }

  deleteUser(data: TChatAddAndDeleteUser) {
    this.chatApi.deleteUser(data);
  }

  deleteChat(data: TChatDelete) {
    this.chatApi.deleteChat(data);
  }
}

const chatController = new ChatController();

export default chatController;
