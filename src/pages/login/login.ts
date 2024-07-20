import styles from "./login.module.scss";
import Button from "../../components/button/button";
import { Block } from "../../../utils/Block/Block";
import Input from "../../components/input/input";
class Login extends Block {
  constructor() {
    super({
      styles: styles,
      button: Button({
        text: "Войти",
        nameButton: "send_login",
      }),
      passwordInput: Input({
        class: styles.input,
        type: 'password',
        name: 'password',
        value: 'ivaninvanov',
      })
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
      <span class="{{styles.textError}}">Неверный логин</span> 
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
