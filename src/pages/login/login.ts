import styles from "./login.module.scss";
import Button from "../../components/button/button";
import { Block } from "../../../utils/Block/Block";
import Input from "../../components/inputBlock/inputBlock";
import { handleBlur, submitForm } from "../../../utils/functions";
class Login extends Block {
  constructor() {
    super({
      styles: styles,
      button: Button({
        text: "Войти",
        nameButton: "send_login",
        events: {
          click: (e) => {
            submitForm(e, this.children);
          },
        },
      }),
      loginInput: Input({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        type: "text",
        name: "login",
        value: "ivaninvanov",
        id: "login",
        errorText: "",
        events: {
          blur: () => handleBlur(this.children.loginInput.children.errorBlock, "Неверный логин")
        },
      }),
      passwordInput: Input({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        type: "password",
        name: "password",
        value: "password228",
        id: "password",
        errorText: "",
        events: {
          blur: () => handleBlur(this.children.passwordInput.children.errorBlock, "Неверный пароль")
        },
      }),
    });
  }


  //<input type="text" class="{{styles.input}}" name="login" value="ivaninvanov">
  render() {
    return `
    <main class="{{styles.login}}">
  <form class="{{styles.container}}">
    <h2 class="{{styles.title}}">Вход</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
          {{{loginInput}}}
          </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        <div class="{{styles.inputElement}}">
          {{{passwordInput}}}
        </div>
      </div>
    </div>
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
