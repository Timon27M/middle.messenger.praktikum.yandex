import styles from "./register.module.scss";
import Button from "../../components/button/button";
import { Block } from "../../../utils/Block/Block.ts";
import Input from "../../components/input/input.ts";
class Register extends Block {
  constructor() {
    super({
      styles: styles,
      button: Button({
        text: "Регистрация",
        nameButton: "send_register",
      }),
      emailInput: Input({
        class: styles.input,
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
        id: 'email'
      }),
      loginInput: Input({
        class: styles.input,
        type: 'text',
        name: 'login',
        value: 'ivaninvanov',
         id: 'login'
      }),
      nameInput: Input({
        class: styles.input,
        type: 'text',
        name: 'first_name',
        value: 'Иван',
         id: 'first_name'
      }),
      surnameInput: Input({
        class: styles.input,
        type: 'text',
        name: 'second_name',
        value: 'Иванов',
         id: 'second_name'
      }),
      telInput: Input({
        class: styles.input,
        type: 'tel',
        name: 'phone',
        value: '+7 (909) 967 30 30',
         id: 'phone'
      }),
      passwordInput: Input({
        class: styles.input,
        type: 'password',
        name: 'password',
        value: 'ivaninvanov',
         id: 'password'
      }),
      passwordInputAgain: Input({
        class: styles.input,
        type: 'password',
        name: 'passwordAgain',
        value: 'ivaninvanov',
         id: 'passwordAgain'
      }),
    });
  }

  render() {
    return `
<main class="{{styles.register}}">
  <form class="{{styles.container}}">
    <h2 class="{{styles.title}}">Регистрация</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Почта</p>
        {{{emailInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
        {{{loginInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Имя</p>
        {{{nameInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Фамилия</p>
        {{{surnameInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Телефон</p>
        {{{telInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        {{{passwordInput}}}
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль (ещё раз)</p>
        {{{passwordInputAgain}}}
        </div>
        <span class="{{styles.textError}}">Пароли не совпадают</span>  
    </div>
      {{{button}}}
      <a class="{{styles.link}}" href="/login">Войти</a>
  </form>
</main>
      `;
  }
}

function register() {
  return new Register();
}

export default register;
