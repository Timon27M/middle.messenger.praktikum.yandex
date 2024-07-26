import styles from "./chat.module.scss";
import avatar from "../../utils/images/avatar.png";
import buttonSettingImage from "../../utils/images/buttonSettings.jpg";
import buttonDocumentImage from "../../utils/images/buttonDocument.jpg";
import { Block } from "../../utils/Block/Block";
import input from "../input/input";
import ErrorBlock from "../errorBlock/errorBlock";
import { handleValidateInput } from "../../utils/functions";
class Chat extends Block {
  constructor() {
    super({
      styles: styles,
      data: {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlte8jVger7Istf0ctZT7Fxyn_GfHfWDg5-w&s",
        firstName: "Андрей",
        time: "12:48",
      },
      avatar: avatar,
      buttonSettingImage: buttonSettingImage,
      buttonDocumentImage: buttonDocumentImage,
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
      errorBlock: ErrorBlock({
        class: styles.textError,
        errorText: "",
      }),
    });
  }

  // <input type="text" class="{{styles.input}}" name="message" placeholder="Сообщение" />

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
    <div class={{styles.messageOwner}}>
      <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
        кусок лунной космической истории — НАСА в какой-то момент попросила
        Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
        знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
        тушки этих камер все еще находятся на поверхности Луны, так как
        астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
        адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
        никогда и не попали. Всего их было произведено 25 штук, одну из них
        недавно продали на аукционе за 45000 евро.</p>
      <p class={{styles.time}}>{{data.time}}</p>
    </div>
    <div class={{styles.messageOwner}}>
      <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
        кусок лунной космической истории — НАСА в какой-то момент попросила
        Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
        знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
        тушки этих камер все еще находятся на поверхности Луны, так как
        астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
        адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
        никогда и не попали. Всего их было произведено 25 штук, одну из них
        недавно продали на аукционе за 45000 евро.</p>
      <p class={{styles.time}}>{{data.time}}</p>
    </div>
    <div class={{styles.messageOwner}}>
      <p class="{{styles.messageText}}">Привет! Смотри, тут всплыл интересный
        кусок лунной космической истории — НАСА в какой-то момент попросила
        Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
        знаем что астронавты летали с моделью 500 EL — и к слову говоря, все
        тушки этих камер все еще находятся на поверхности Луны, так как
        астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге
        адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
        никогда и не попали. Всего их было произведено 25 штук, одну из них
        недавно продали на аукционе за 45000 евро.
      </p>
      <p class={{styles.time}}>{{data.time}}</p>
    </div>
  </div>
  <div class="{{styles.inputBlock}}">
    <button class="{{styles.documentButton}}">
      <img src={{buttonDocumentImage}} alt="image" />
    </button>
    <div class="{{styles.inputContainer}}">
      {{{messageInput}}}
      {{{errorBlock}}}
    </div>
    <button class="{{styles.buttonSendActive}}">
      >
    </button>
  </div>
</section>
    `;
  }
}

function chat() {
  return new Chat();
}

export default chat;
