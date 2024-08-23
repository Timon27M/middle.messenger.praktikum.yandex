import styles from "./chat.module.scss";
import avatar from "../../utils/images/avatar.png";
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

type TProps = {
  id: number;
  title: string;
  image: string | null;
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
      avatar,
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
            this.children.popupAddUser.setProps({ show: true })
          },
        },
      }),
      buttonDeleteUser: buttonLink({
        text: "Удалить пользователя",
        class: styles.buttonNavbar,
        events: {
          click: () => {},
        },
      }),
      buttonDeleteChat: buttonLink({
        text: "Удалить чат",
        class: styles.buttonNavbar,
        events: {
          click: () => {},
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
                console.log(value)

              if (value) {
                userController.searchUser({ login: value }).then((res) => {
                  console.log(res)
                  // const usersId = res[0].id;
                  // if (usersId) {
                  //   chatController.addUser({
                  //     users: [usersId],
                  //     chatId: props.id,
                  //   }).then((res) => {
                  //     console.log(res)
                  //   })
                  // }
                });
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
  </section>
    `;
  }
}

function chat(props: TProps) {
  return new Chat(props);
}

export default chat;
