import styles from "./forgotPassword.module.scss";
import Button from "../../components/button/button";
import ButtonBack from "../../components/buttonBack/buttonBack";
import avatar from "../../utils/images/avatar.png";

import Block from "../../utils/Block/Block";
import InputBlock from "../../components/inputBlock/inputBlock";
import { handleValidateInput, submitForm } from "../../utils/functions";
import ErrorFormBlock from "../../components/errorFormBlock/errorFormBlock";

export class ForgotPassword extends Block {
  constructor() {
    super({
      styles,
      avatar,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      button: Button({
        text: "Сохранить",
        nameButton: "send_forgot-password",
        events: {
          click: (evt: Event) => submitForm(evt, this.children, this.children.errorFormBlock),
        },
      }),
      buttonBack: ButtonBack(),
      oldPasswordInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "password",
        name: "oldPassword",
        value: "ivaninvanoV9",
        id: "oldPassword",
        events: {
          blur: () => handleValidateInput(
            this.children.oldPasswordInputBlock.children.errorBlock,
            this.children.oldPasswordInputBlock.children.input,
            "Некорректный пароль",
          ),
        },
      }),
      newPasswordInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "password",
        name: "newPassword",
        value: "ivaninvanoV9",
        id: "newPassword",
        events: {
          blur: () => handleValidateInput(
            this.children.newPasswordInputBlock.children.errorBlock,
            this.children.newPasswordInputBlock.children.input,
            "Некорректный пароль",
          ),
        },
      }),
      newPasswordAgainInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "password",
        name: "newPasswordAgain",
        value: "ivaninvanoV9",
        id: "newPasswordAgain",
        events: {
          blur: () => handleValidateInput(
            this.children.newPasswordAgainInputBlock.children.errorBlock,
            this.children.newPasswordAgainInputBlock.children.input,
            "Пароль не совпадает",
          ),
        },
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
      {{{oldPasswordInputBlock}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Новый пароль</p>
      {{{newPasswordInputBlock}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Повторите новый пароль</p>
      {{{newPasswordAgainInputBlock}}}
    </div>
    <span class="{{styles.errorForm}}">{{{errorFormBlock}}}</span>
  <div class="{{styles.buttonBlock}}">
    {{{button}}}
  </div>
  </form>
</main>
`;
  }
}

function forgotPassword() {
  return new ForgotPassword();
}

export default forgotPassword;
