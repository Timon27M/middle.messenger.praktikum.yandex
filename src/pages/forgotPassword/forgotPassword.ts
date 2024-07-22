import styles from "./forgotPassword.module.scss";
import Button from "../../components/button/button";
import ButtonBack from "../../components/buttonBack/buttonBack";
import avatar from "../../../utils/images/avatar.png";

import { Block } from "../../../utils/Block/Block";
import Input from "../../components/inputBlock/inputBlock";
import { submitForm } from "../../../utils/functions";
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
          click: (evt: Event) => submitForm(evt, this.children),
        },
      }),
      buttonBack: ButtonBack(),
      oldPasswordInput: Input({
        class: styles.input,
        type: "password",
        name: "oldPassword",
        value: "ivaninvanov",
        id: "oldPassword",
      }),
      newPasswordInput: Input({
        class: styles.input,
        type: "password",
        name: "newPassword",
        value: "ivaninvanov",
        id: "newPassword",
      }),
      newPasswordAgainInput: Input({
        class: styles.input,
        type: "password",
        name: "newPasswordAgain",
        value: "ivaninvanov",
        id: "newPasswordAgain",
      }),
    });
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
      {{{oldPasswordInput}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Новый пароль</p>
      {{{newPasswordInput}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Повторите новый пароль</p>
      {{{newPasswordAgainInput}}}
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
