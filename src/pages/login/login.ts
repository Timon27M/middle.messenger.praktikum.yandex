import styles from "./login.module.scss";
import Button from "../../components/button/button";
import { Block } from "../../utils/Block/Block";
import InputBlock from "../../components/inputBlock/inputBlock";
import { handleValidateInput, submitForm } from "../../utils/functions";
import ErrorFormBlock from "../../components/errorFormBlock/errorFormBlock";
class Login extends Block {
  constructor() {
    super({
      styles: styles,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      button: Button({
        text: "Войти",
        nameButton: "send_login",
        events: {
          click: (e) => {
            this.setProps({ textError: "blalba" });
            submitForm(e, this.children, this.children.errorFormBlock);
          },
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
      passwordInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        type: "password",
        name: "password",
        value: "ivaninvanoV9",
        id: "password",
        errorText: "",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.passwordInputBlock.children.errorBlock,
              this.children.passwordInputBlock.children.input,
              "Некорректный пароль"
            ),
        },
      }),
    });
  }

  render() {
    return `
    <main class="{{styles.login}}">
  <form class="{{styles.container}}">
    <h2 class="{{styles.title}}">Вход</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
          {{{loginInputBlock}}}
          </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        <div class="{{styles.inputElement}}">
          {{{passwordInputBlock}}}
        </div>
      </div>
      </div>
      <span class="{{styles.errorForm}}">{{{errorFormBlock}}}</span>
      {{{button}}}
      <a class="{{styles.link}}" href="/register">Нет аккаунта?</a>
  </form>
</main>
    `;
  }
}

function login() {
  return new Login();
}

export default login;
