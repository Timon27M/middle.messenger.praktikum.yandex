import chatApi, {
  TChatAddAndDeleteUser,
  TChatCreate,
  TChatDelete,
} from "../../utils/api/ChatApi";
import { store } from "../../utils/store/Store";

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

 async getUsersChat(id: string) {
    return this.chatApi.getUsersChat(id);
  }

 async create(data: TChatCreate) {
   await this.chatApi.create(data);
  }

 async addUser(data: TChatAddAndDeleteUser) {
    await this.chatApi.addUser(data);
  }

 async deleteUser(data: TChatAddAndDeleteUser) {
   await this.chatApi.deleteUser(data);
  }

 async deleteChat(data: TChatDelete) {
   return this.chatApi.deleteChat(data);
  }
}

const chatController = new ChatController();

export default chatController;
