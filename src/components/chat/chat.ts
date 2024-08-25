import styles from "./chat.module.scss";
import buttonSettingImage from "../../utils/images/buttonSettings.jpg";
import buttonDocumentImage from "../../utils/images/buttonDocument.jpg";
import Block from "../../utils/Block/Block";
import input from "../input/input";
import ErrorBlock from "../errorBlock/errorBlock";
import { handleValidateInput, validate } from "../../utils/functions/functions";
import { store } from "../../utils/store/Store";
import webSocket from "../../utils/api/WebSocket";
import createMessageList from "../../utils/functions/createMessageList";
import buttonLink from "../buttonLink/buttonLink";
import Popup from "../popup/popup";
import Button from "../button/button";
import userController from "../../service/userController/UserController";
import chatController from "../../service/chatController/ChatController";
import DefaultChat from "../defaultChat/defaultChat";
import renderChatsList from "../../utils/functions/renderChatsList";

type TProps = {
  id: number;
  ownerId: number;
  title: string;
  image: string | null;
  avatar: string
};

export class Chat extends Block {
  constructor(props: TProps) {
    super({
      styles,
      id: props.id,
      data: {
        image: props.image
          ? props.image
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlte8jVger7Istf0ctZT7Fxyn_GfHfWDg5-w&s",
        firstName: props.title,
      },
      avatar: props.avatar,
      buttonSettingImage,
      buttonDocumentImage,
      messageInput: input({
        class: styles.input,
        type: "text",
        name: "message",
        placeholder: "Сообщение",
        id: "message",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.errorBlock,
              this.children.messageInput,
              "Поле не может быть пустым"
            ),
        },
      }),
      buttonAddUser: buttonLink({
        text: "Добавить пользователя",
        class: styles.buttonNavbar,
        events: {
          click: () => {
            this.children.popupAddUser.setProps({ show: true });
          },
        },
      }),
      buttonDeleteUser: buttonLink({
        text: "Удалить пользователя",
        class: styles.buttonNavbar,
        events: {
          click: () => {
            this.children.popupDeleteUser.setProps({ show: true });
          },
        },
      }),
      buttonDeleteChat: buttonLink({
        text: "Удалить чат",
        class: styles.buttonNavbar,
        events: {
          click: () => {
            if (props.ownerId === store.getState().currentUser?.id) {
              chatController.deleteChat({ chatId: props.id }).then(() => {
                store.set("currentChat", DefaultChat());

                chatController.getChats().then(() => {
                  const { chatList } = store.getState();
                  if (chatList) {
                    store.set("chatComponentList", renderChatsList(chatList));
                  } else {
                    store.set("chatComponentList", renderChatsList([]));
                  }
                });
              });
            } else {
              alert("Нет прав доступа");
            }
          },
        },
      }),
      popupAddUser: Popup({
        titlePopup: "Добавить пользователя",
        typeInput: "text",
        placeholder: "Логин",
        name: "popupAddUser",
        button: Button({
          text: "Добавить",
          nameButton: "addUser",
          events: {
            click: (evt: Event) => {
              evt.preventDefault();
              const value =
                this.children.popupAddUser.children.input.getValue();
              console.log(value);
              if (store.getState().currentUser?.id === props.ownerId) {
                if (value) {
                  userController.searchUser({ login: value }).then((res) => {
                    const usersId = res[0].id;
                    if (usersId) {
                      chatController.addUser({
                        users: [usersId],
                        chatId: props.id,
                      });
                    }
                  });
                  this.children.popupAddUser.setProps({ show: false });
                } else {
                  alert("Введите логин");
                }
              } else {
                alert("Нет прав доступа");
                this.children.popupAddUser.setProps({ show: false });
              }
            },
          },
        }),
      }),
      popupDeleteUser: Popup({
        titlePopup: "Удалить пользователя",
        typeInput: "text",
        placeholder: "Логин",
        name: "popupDeleteUser",
        button: Button({
          text: "Удалить",
          nameButton: "deleteUser",
          events: {
            click: (evt: Event) => {
              evt.preventDefault();
              const value =
                this.children.popupDeleteUser.children.input.getValue();
              if (store.getState().currentUser?.id === props.ownerId) {
                if (value) {
                  userController.searchUser({ login: value }).then((res) => {
                    const usersId = res[0].id;
                    if (usersId) {
                      chatController.deleteUser({
                        users: [usersId],
                        chatId: props.id,
                      });
                    }
                  });
                } else {
                  alert("Введите логин");
                }
                this.children.popupDeleteUser.setProps({ show: false });
              } else {
                alert("У вас нет прав доступа");
              }
            },
          },
        }),
      }),
      buttonSendMessage: buttonLink({
        class: styles.buttonSendActive,
        text: ">",
        events: {
          click: (evt: Event) => {
            evt.preventDefault();

            const value = this.children.messageInput.getValue();

            const valid = validate(value, "message");

            if (valid === true) {
              webSocket.send(value);
              this.children.messageInput.clearValue();
            } else {
              alert("Заполните поле сообщение правильно");
            }
          },
        },
      }),
      errorBlock: ErrorBlock({
        class: styles.textError,
        errorText: "",
      }),
      messageList: createMessageList(),
    });
  }

  componentDidMount() {
    const userId = store.getState().currentUser?.id;
    webSocket.create(this.props.id, userId, this);
  }

  render() {
    return `
    <section class="{{styles.sectionChat}}">
    <div class="{{styles.chat}}">
  <div class="{{styles.navbar}}">
  <div class="{{styles.navbarContainer}}">
    <img class="{{styles.image}}" src={{avatar}} alt="image" />
    <p class="{{styles.firstName}}">{{data.firstName}}</p>
    </div>
    <div>
    {{{buttonAddUser}}}
    {{{buttonDeleteUser}}}
    {{{buttonDeleteChat}}}
    </div>
  </div>
  <div class="{{styles.container}}">
    {{{messageList}}}
  </div>
  <div class="{{styles.inputBlock}}">
    <button class="{{styles.documentButton}}">
      <img src={{buttonDocumentImage}} alt="image" />
    </button>
    <div class="{{styles.inputContainer}}">
      {{{messageInput}}}
      {{{errorBlock}}}
    </div>
    {{{buttonSendMessage}}}
  </div>
  </div>
  {{{popupAddUser}}}
  {{{popupDeleteUser}}}
  </section>
    `;
  }
}

function chat(props: TProps) {
  return new Chat(props);
}

export default chat;
