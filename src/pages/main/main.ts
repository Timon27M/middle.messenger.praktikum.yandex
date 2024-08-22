import styles from "./main.module.scss";
import Block from "../../utils/Block/Block";
import DefaultChat from "../../components/defaultChat/defaultChat";
import Chat from "../../components/chat/chat";
import { router } from "../../utils/navigations/Router";
import authController from "../../service/authController/AuthController";
import {
  connect,
  TChatStore,
  TMessageStore,
  TUserStore,
} from "../../utils/store/Store";
import chatController from "../../service/chatController/ChatController";
import chats from "../../components/chats/chats";
import chatItem from "../../components/chatItem/ChatItem";

export type ChatPageProps = {
  currentChat: typeof Chat;
  chatList: TChatStore[];
  currentUser?: TUserStore;
  messageList: TMessageStore[];
  searchValue: string;
  chatComponent?: typeof Chat;
};

function renderChatsList(chatList: TChatStore[]) {
  if (chatList !== undefined && chatList.length > 0) {
    const chatComponents = chatList.map((chat) => {
      const chatTest = chatItem(chat);

      return chatTest;
    });
    return chatComponents;
  }
  return undefined;
}
export class Main extends Block {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      styles,
      chatLists: renderChatsList(props.chatList),
      chats: chats(),
      activeChat: props.currentChat ? props.currentChat : DefaultChat(),
    });
  }

  componentDidMount() {
    chatController.getChats().finally(() => {
      this.setProps({ chatLists: renderChatsList(this.props.chatList) });
    });
    authController.getUser().catch((err) => {
      console.log(err.message);
      router.go("/");
    });
  }

  render() {
    return `
    <main class={{styles.main}}>
      <div class="{{styles.chats}}">
      {{{chats}}}
      {{{chatLists}}}
      </div>
       <div class={{styles.activeChat}}>
          {{{currentChat}}}
      </div>
    </main>
      `;
  }
}

const main = () => {
  const withChats = connect((state) => ({
    currentChat: state.currentChat || DefaultChat(),
    currentUser: state.currentUser,
    chatList: state.chatList || [],
    messageList: state.messageList || undefined,
  }));

  return withChats(Main);
};

export default main;
