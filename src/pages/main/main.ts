import styles from "./main.module.scss";
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
import chats from "../../components/chats/chats";
import chatItem, { ChatItem } from "../../components/chatItem/ChatItem";
import chatList from "../../components/chatList/ChatList";

export type ChatPageProps = {
  currentChatId: string;
  chatList: TChatStore[];
  currentUser?: TUserStore;
  messageList: TMessageStore[];
  searchValue: string;
  chatComponent?: () => typeof Chat;
};

function fun() {
  console.log(store.getState())
}

export class Main extends Block {
  chatList: TChatStore[];
  testStore: any;

  constructor(props: ChatPageProps) {
    super({
      ...props,
      styles,
      chatList: chatList(),
      chats: chats(),
      activeChat:
        props.chatComponent === undefined ? DefaultChat() : props.chatComponent,
    });

    this.chatList = props.chatList;
  }

  componentDidMount() {
    authController.getUser().catch((err) => {
      console.log(err.message);
      router.go("/");
    });

    chatController.getChats().finally(() => {
      this.setProps(store.getState().chatList);
      console.log(store.getState());
    });
  }

  test() {
    let obj = {
      chatList: {},
    };
    chatController.getChats().finally(() => {
      console.log(1);
      console.log(store.getState());
      console.log(this.props.chatList);
    });

    return obj;
  }

  // renderChatsList() {
  //   const { chatList } = this.props;

  //   // console.log(new Chats({chatList: chatList}).getContent())
  //   console.log(new Chats({chatList: chatList}))
  //   return new Chats({chatList: chatList});

  //   // function chats() {
  //   //   return new Chats({chatList: chatList})
  //   // }

  //   // console.log(DefaultChat())

  // }

  renderChatsList() {
    const newChatList = store.getState().chatList;

    if (newChatList !== undefined) {
      const chatComponents = newChatList.map((chat) => {
        const chatTest = chatItem({
          id: chat.id,
          avatar: chat.avatar,
          title: chat.title,
          created_by: chat.created_by,
          last_message: chat.last_message,
          unread_count: chat.unread_count,
          // events: {
          //   click: () => console.log("qwer")
          // }
        });
        
        return chatTest.getContent().outerHTML;
      });
      return chatComponents.join("");
    }
    return "<div></div>";
  }

  render() {
    const Test = this.renderChatsList();
    console.log(this.props)

    return `
    <main class={{styles.main}}>
      <div class="{{styles.chats}}">
      {{{chats}}}
     ${Test}
     {{{newTest}}}
      </div>
       <div class={{styles.activeChat}}>
          {{{activeChat}}}
      </div>
    </main>
      `;

    // console.log(this.props.chatList)
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
