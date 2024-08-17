import styles from "./register.module.scss";
import Button from "../../components/button/button";
import Block from "../../utils/Block/Block";
import InputBlock from "../../components/inputBlock/inputBlock";
import {
  handleValidateInput,
  collectData,
} from "../../utils/functions/functions";
import ErrorFormBlock from "../../components/errorFormBlock/errorFormBlock";
import { router } from "../../utils/navigations/Router";
import authController from "../../service/authController/AuthController";
import { TRegisterFormData } from "../../utils/types/types";

export class Register extends Block {
  constructor() {
    super({
      styles,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      button: Button({
        text: "Регистрация",
        nameButton: "send_register",
        events: {
          click: (e) => {
            const { formData } = collectData(
              e,
              this.children,
              this.children.errorFormBlock
            );

            authController.register(formData as TRegisterFormData);
          },
        },
      }),
      buttonlogin: Button({
        type: "link",
        styleType: "link",
        nameButton: "changePage",
        text: "Войти",
        color: "blue",
        events: {
          click: (evt: Event) => {
            evt.preventDefault();
            router.go("/");
          },
        },
      }),
      emailInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "email",
        name: "email",
        value: "pochta@yandex.ru",
        id: "email",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.emailInputBlock.children.errorBlock,
              this.children.emailInputBlock.children.input,
              "Некорректный email"
            ),
        },
      }),
      loginInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "text",
        name: "login",
        value: "ivaninvanov",
        id: "login",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.loginInputBlock.children.errorBlock,
              this.children.loginInputBlock.children.input,
              "Некорректный логин"
            ),
        },
      }),
      nameInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "text",
        name: "first_name",
        value: "Иван",
        id: "first_name",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.nameInputBlock.children.errorBlock,
              this.children.nameInputBlock.children.input,
              "Некорректное имя"
            ),
        },
      }),
      surnameInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "text",
        name: "second_name",
        value: "Иванов",
        id: "second_name",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.surnameInputBlock.children.errorBlock,
              this.children.surnameInputBlock.children.input,
              "Некорректная фамилия"
            ),
        },
      }),
      telInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "tel",
        name: "phone",
        value: "+79099673030",
        id: "phone",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.telInputBlock.children.errorBlock,
              this.children.telInputBlock.children.input,
              "Некорректный номер телефона"
            ),
        },
      }),
      passwordInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "password",
        name: "password",
        value: "ivaninvanoV9",
        id: "password",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.passwordInputBlock.children.errorBlock,
              this.children.passwordInputBlock.children.input,
              "Некорректный пароль"
            ),
        },
      }),
      passwordInputAgainBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "password",
        name: "passwordAgain",
        value: "ivaninvanoV9",
        id: "passwordAgain",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.passwordInputAgainBlock.children.errorBlock,
              this.children.passwordInputAgainBlock.children.input,
              "Пароли не совпадают"
            ),
        },
      }),
    });
  }

  componentDidMount(): void {
    authController.getUser("/messenger");
  }

  render() {
    return `
<main class="{{styles.register}}">
  <form class="{{styles.container}}">
    <h2 class="{{styles.title}}">Регистрация</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Почта</p>
        {{{emailInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
        {{{loginInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Имя</p>
        {{{nameInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Фамилия</p>
        {{{surnameInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Телефон</p>
        {{{telInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        {{{passwordInputBlock}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль (ещё раз)</p>
        {{{passwordInputAgainBlock}}}
        </div> 
    </div>
    <span class="{{styles.errorForm}}">{{{errorFormBlock}}}</span>
      {{{button}}}
      {{{buttonlogin}}}
  </form>
</main>
      `;
  }
}

function register() {
  return new Register();
}

export default register;
