import styles from "./forgotPassword.module.scss";
import Button from "../../components/button/button";
import ButtonBack from "../../components/buttonBack/buttonBack";
import avatar from "../../../utils/images/avatar.png";

import { Block } from "../../../utils/Block/Block";
class ForgotPassword extends Block {
  constructor(props?: Record<string, any>) {
    super({
      ...props,
      styles: styles,
      avatar: avatar,
      button: Button({
        text: "Сохранить",
        nameButton: "send_forgot-password",
        events: {
          click: (evt: Event) => {
            this.handleClickSendButton(evt);
          },
        },
      }),
      buttonBack: ButtonBack(),
    });
  }
  handleClickSendButton(evt: Event) {
    evt.preventDefault();
    this.children.button.setProps({ text: "test event" });
  }

  render() {
    return `
  <main class="{{styles.forgotPassword}}">
        {{{buttonBack}}}
  <div class="{{styles.container}}">
  <a href="#">
    <img class="{{styles.avatar}}" src={{avatar}} alt="avatar" />
    </a>
  </div>
  <form class="{{styles.inputsBlock}}">
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Старый пароль</p>
      <input name="oldPassword" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Новый пароль</p>
      <input name="newPassword" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Повторите новый пароль</p>
      <input name="password" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
  <div class="{{styles.buttonBlock}}">
    {{{button}}}
  </div>
  </form>
</main>
`;
  }
}

function forgotPassword(props?: Record<string, any>) {
  return new ForgotPassword(props);
}

export default forgotPassword;
