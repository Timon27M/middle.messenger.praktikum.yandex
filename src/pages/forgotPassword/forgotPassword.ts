import styles from "./forgotPassword.module.scss";
import Button from "../../components/button/button";
import ButtonBack from "../../components/buttonBack/buttonBack";
import avatar from "../../../utils/images/avatar.png";

import { Block } from "../../../utils/Block/Block";
import Input from "../../components/input/input";
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
      oldPasswordInput: Input({
        class: styles.input,
        type: 'password',
        name: 'oldPassword',
        value: 'ivaninvanov',
      }),
      newPasswordInput: Input({
        class: styles.input,
        type: 'password',
        name: 'newPassword',
        value: 'ivaninvanov',
      }),
      newPasswordAgainInput: Input({
        class: styles.input,
        type: 'password',
        name: 'newPasswordAgain',
        value: 'ivaninvanov',
      }),
    });
  }
  handleClickSendButton(evt: Event) {
    evt.preventDefault();
    this.children.button.setProps({ text: "test event" });
    this.children.newPasswordInput.setProps({ disabled: undefined })
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
