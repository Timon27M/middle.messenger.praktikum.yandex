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
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import renderChatsList from "../../utils/functions/renderChatsList";
import searchChat from "../../utils/functions/searchChats";
import Popup from "../../components/popup/popup";

export type ChatPageProps = {
  currentChat: typeof Chat;
  chatList: TChatStore[];
  currentUser?: TUserStore;
  messageList: TMessageStore[];
  searchValue: string;
  chatComponent?: typeof Chat;
};

export class Main extends Block {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      styles,
      buttonChangeData: Button({
        type: "link",
        styleType: "link",
        nameButton: "changePage",
        text: "Профиль >",
        color: "gray",
        events: {
          click: () => {
            router.go("/settings");
          },
        },
      }),
      input: Input({
        class: styles.input,
        type: "text",
        name: "inputSearch",
        id: "inputSearch",
        placeholder: "Поиск",
        events: {
          keyup: (evt: KeyboardEvent) => {
            if (evt.target instanceof HTMLInputElement) {
              const value = evt.target.value;

              console.log(value);
              if (value === "") {
                const allChatList = store.getState().chatList;
                if (allChatList) {
                  store.set("chatComponentList", renderChatsList(allChatList))
                }
              } else {
                const { newChatsList } = searchChat(value);

                if (newChatsList) {
                  store.set("chatComponentList", renderChatsList(newChatsList))
                }
              }
              evt.target.focus();
            }
          },
        },
      }),
      buttonCreateChat: Button({
        text: "Создать чат",
        nameButton: "createChat",
        events: {
          click: () => {
            console.log();
            this.children.popup.setProps({ show: true });
          },
        },
      }),
      popup: Popup({
        titlePopup: "Введите название чата",
        typeInput: "text",
        name: "createChat",
        placeholder: "Введите название чата",
        button: Button({
          text: "Создать",
          nameButton: "createChatButton",
          events: {
            click: () => {
              const value = this.children.popup.children.input.getValue();

              if (value) {
                chatController
                  .create({ title: value })
                  .then(() => {
                    this.children.popup.setProps({ show: false });
                    chatController
                      .getChats()
                      .then(() => {
                        store.set("chatComponentList", renderChatsList(this.props.chatList))
                      })
                      .finally(() => {});
                  })
                  .catch((err) => {
                    alert(`${err.message}`);
                  });
              } else {
                alert("Введите название чата");
              }
            },
          },
        }),
      }),
    });
  }

  componentDidMount() {
    authController.getUser().catch((err) => {
      console.log(err.message);
      router.go("/");
    });
    chatController.getChats().then(() => {
      store.set("chatComponentList", renderChatsList(this.props.chatList))
    });
  }

  render() {
    return `
    <main class={{styles.main}}>
      <div class="{{styles.chats}}">
      <div>
    <div class="{{styles.nav}}">
    {{{buttonChangeData}}}
    <div class={{styles.container}}>
    {{{buttonCreateChat}}}
    </div>
    {{{input}}}
    </div>
    </div>
      {{{chatComponentList}}}
      </div>
       <div class={{styles.activeChat}}>
          {{{currentChat}}}
      </div>
      {{{popup}}}
    </main>
      `;
  }
}

const main = () => {
  const withChats = connect((state) => ({
    currentChat: state.currentChat || DefaultChat(),
    chatComponentList: state.chatComponentList || [],
    currentUser: state.currentUser,
    chatList: state.chatList || [],
    messageList: state.messageList || undefined,
  }));

  return withChats(Main);
};

export default main;
