import styles from "./main.module.scss";
import Chats from "../../components/chats/chats";
import Block from "../../utils/Block/Block";
import DefaultChat from "../../components/defaultChat/defaultChat";
import Chat from "../../components/chat/chat";
import { router } from "../../utils/navigations/Router";
import authController from "../../service/authController/AuthController";
import {
  ChatStore,
  connect,
  Message,
  store,
  User,
} from "../../utils/store/Store";

export type ChatPageProps = {
  currentChatId: string;
  currentUser?: User;
  chatList: ChatStore[];
  messageList: Message[];
  searchValue: string;
  chatComponent?: () => typeof Chat;
};

export class Main extends Block {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      styles,
      allChats: Chats(),
      activeChat:
        props.chatComponent === undefined ? DefaultChat() : props.chatComponent,
    });
  }

  componentDidMount() {
    authController
      .getUser()
      .catch((err) => {
        console.log(err.message);
        router.go("/");
      })
      .finally(() => {
        console.log(store.getState());
      });
  }

  render() {
    return `
  <main class={{styles.main}}>
    <div class="{{styles.chats}}">
        {{{allChats}}}
    </div>
     <div class={{styles.activeChat}}>
        {{{activeChat}}}
    </div>
  </main>
    `;
  }
}

const main = () => {
  const withChats = connect((state) => ({
    currentChatId: state.currentChatId,
    currentUser: state.currentUser,
    chatList: state.chatList || [],
    messageList: state.messageList || [],
    searchValue: state.searchValue || "",
  }));

  return withChats(Main);
};

// function main(chatComponent: () => typeof DefaultChat | typeof Chat) {
//   return new main1(chatComponent);
// }

export default main;
