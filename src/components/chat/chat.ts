import styles from "./chat.module.scss";
import avatar from "../../utils/images/avatar.png";
import buttonSettingImage from "../../utils/images/buttonSettings.jpg";
import buttonDocumentImage from "../../utils/images/buttonDocument.jpg";
import Block from "../../utils/Block/Block";
import input from "../input/input";
import ErrorBlock from "../errorBlock/errorBlock";
import {
  handleValidateInput,
  validate,
} from "../../utils/functions/functions";
import { store } from "../../utils/store/Store";
import webSocket from "../../utils/api/WebSocket";
import createMessageList from "../../utils/functions/createMessageList";
import buttonLink from "../buttonLink/buttonLink";

export class Chat extends Block {
  constructor(id: number) {
    super({
      styles,
      id,
      data: {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlte8jVger7Istf0ctZT7Fxyn_GfHfWDg5-w&s",
        firstName: "Qwer",
        time: "12:48",
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
      buttonSendMessage: buttonLink({
        class: styles.buttonSendActive,
        text: ">",
        events: {
          click: (evt: Event) => {
            evt.preventDefault();

            const value = this.children.messageInput.getValue()

            const valid = validate(
              value,
              "message"
            );

            if (valid === true) {

              webSocket.send(value);
              this.children.messageInput.clearValue()
            } else {
              alert("Заполните поле сообщение правильно")
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
    console.log(webSocket);
    console.log(store.getState());
  }

  // <input type="text" class="{{styles.input}}" name="message" placeholder="Сообщение" />

  // <div class={{styles.messageOwner}}>
  //       <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
  //         кусок лунной космической истории — НАСА в какой-то момент попросила
  //         Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
  //         знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
  //         тушки этих камер все еще находятся на поверхности Луны, так как
  //         астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
  //         адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
  //         никогда и не попали. Всего их было произведено 25 штук, одну из них
  //         недавно продали на аукционе за 45000 евро.</p>
  //       <p class={{styles.time}}>{{data.time}}</p>
  //     </div>
  //     <div class={{styles.messageOwner}}>
  //       <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
  //         кусок лунной космической истории — НАСА в какой-то момент попросила
  //         Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
  //         знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
  //         тушки этих камер все еще находятся на поверхности Луны, так как
  //         астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
  //         адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
  //         никогда и не попали. Всего их было произведено 25 штук, одну из них
  //         недавно продали на аукционе за 45000 евро.</p>
  //       <p class={{styles.time}}>{{data.time}}</p>
  //     </div>
  //     <div class={{styles.messageOwner}}>
  //       <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
  //         кусок лунной космической истории — НАСА в какой-то момент попросила
  //         Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
  //         знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
  //         тушки этих камер все еще находятся на поверхности Луны, так как
  //         астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
  //         адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
  //         никогда и не попали. Всего их было произведено 25 штук, одну из них
  //         недавно продали на аукционе за 45000 евро.
  //       </p>
  //       <p class={{styles.time}}>{{data.time}}</p>
  //     </div>

  render() {
    return `
    <section class="{{styles.chat}}">
  <div class="{{styles.navbar}}">
    <img class="{{styles.image}}" src={{avatar}} alt="image" />
    <p class="{{styles.firstName}}">{{data.firstName}}</p>
    <button class="{{styles.settingsButton}}">
      <img src={{buttonSettingImage}} alt="image" />
    </button>
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
</section>
    `;
  }
}

function chat(id: number) {
  return new Chat(id);
}

export default chat;
