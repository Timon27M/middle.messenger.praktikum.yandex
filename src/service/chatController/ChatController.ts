import chatApi, {
  TChatAddAndDeleteUser,
  TChatCreate,
  TChatDelete,
} from "../../utils/api/ChatApi";

class ChatController {
  private chatApi: typeof chatApi;

  constructor() {
    this.chatApi = chatApi;
  }

  getChats() {
    return this.chatApi.getChats();
  }

  getUsersChat(id: string) {
    return this.chatApi.getUsersChat(id);
  }

  create(data: TChatCreate) {
    return this.chatApi.create(data);
  }

  addUser(data: TChatAddAndDeleteUser) {
    return this.chatApi.addUser(data);
  }

  deleteUser(data: TChatAddAndDeleteUser) {
    return this.chatApi.deleteUser(data);
  }

  deleteChat(data: TChatDelete) {
    return this.chatApi.deleteChat(data);
  }
}

const chatController = new ChatController();

export default chatController;
