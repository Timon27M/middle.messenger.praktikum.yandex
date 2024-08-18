import styles from "./main.module.scss";
import Chats, { TProps } from "../../components/chats/chats";
import Block from "../../utils/Block/Block";
import DefaultChat from "../../components/defaultChat/defaultChat";
import Chat from "../../components/chat/chat";
import { router } from "../../utils/navigations/Router";
import authController from "../../service/authController/AuthController";
import {
  connect,
  store,
  TChatStore,
  TMessageStore,
  TUserStore,
} from "../../utils/store/Store";
import chatController from "../../service/chatController/ChatController";

export type ChatPageProps = {
  currentChatId: string;
  chatList: TChatStore[];
  currentUser?: TUserStore;
  messageList: TMessageStore[];
  searchValue: string;
  chatComponent?: () => typeof Chat;
};

export class Main extends Block {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      styles,
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

    chatController
      .getChats()
      .finally(() => {
        console.log(store.getState());
      });
  }

  renderChatsList() {
    const { chatList } = this.props;

    // console.log(new Chats({chatList: chatList}).getContent())
    console.log(new Chats({chatList: chatList}))
    return new Chats({chatList: chatList});

    // function chats() {
    //   return new Chats({chatList: chatList})
    // } 

    // console.log(DefaultChat())

  }

  render() {
    const chats = this.renderChatsList()
    
    return `
  <main class={{styles.main}}>
    <div class="{{styles.chats}}">
    {{{${chats}}}}
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

export default main;
