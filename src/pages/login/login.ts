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
        events: {
          click: (e) => {this.submitForm(e)}
        }
      }),
      loginInput: Input({
        class: styles.input,
        type: 'text',
        name: 'login',
        value: 'ivaninvanov',
        id: 'loginInput'
      }),
      passwordInput: Input({
        class: styles.input,
        type: 'password',
        name: 'password',
        value: 'password228',
        id: 'passwordInput'
      }),
    });
  }

  submitForm(evt: Event, arr = [this.children.loginInput, this.children.passwordInput]) {
    evt.preventDefault()
    const formData: Record<string, string> = {}

    arr.forEach((input) => {
      const name = input.porps.name

        formData.name = input.getValue()
  
    })
    console.log(formData)
    return formData

    // const name: string = this.children.loginInput.props.name
    // const value: string = this.children.loginInput.getValue() 

    // console.log(name, value)
    // const formData = {
    //   [name]: this.children.loginInput.getValue()
    // }

    // console.log(formData)
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
