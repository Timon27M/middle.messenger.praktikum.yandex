import styles from "./profile.module.scss";
import ButtonBack from "../../components/buttonBack/buttonBack";
import Button from "../../components/button/button";
import avatar from "../../../utils/images/avatar.png";
import { Block } from "../../../utils/Block/Block";
import Input from "../../components/input/input";
class Profile extends Block {
  constructor() {
    super({
      styles: styles,
      avatar: avatar,
      ButtonBack: ButtonBack(),
      ButtonPopup: Button({
        text: "Изменить",
        nameButton: "change_profile",
      }),
      emailInput: Input({
        class: styles.input,
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
        disabled: true,
      }),
      loginInput: Input({
        class: styles.input,
        type: 'text',
        name: 'login',
        value: 'ivanivanov',
        disabled: true,
      }),
      nameInput: Input({
        class: styles.input,
        type: 'text',
        name: 'first_name',
        value: 'Иван',
        disabled: true,
      }),
      surnameInput: Input({
        class: styles.input,
        type: 'text',
        name: 'second_name',
        value: 'Иванов',
        disabled: true,
      }),
      nameInChatInput: Input({
        class: styles.input,
        type: 'text',
        name: 'display_name',
        value: 'Иван',
        disabled: true,
      }),
      telInput: Input({
        class: styles.input,
        type: 'tel',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        disabled: true,
      }),
    });
  }

  render() {
    return `
<main class="{{styles.profile}}">
{{{ButtonBack}}}
  <form class="{{styles.container}}">
  <a href="">
    <img class="{{styles.avatar}}" src={{avatar}} alt="avatar" />
    </a>
    <h2 class="{{styles.name}}">Ваня</h2>
  </div>
  <div class="{{styles.inputsBlock}}">
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
      <p class="{{styles.inputName}}">Имя в чате</p>
     {{{nameInChatInput}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Телефон</p>
      {{{telInput}}}
    </div>
  </div>
  <div class="{{styles.buttons}}">
    <button class="{{styles.button}} {{styles.buttonBlue}}">Изменить данные</button>
    <a type="button" href="/forgot-password" class="{{styles.button}} {{styles.buttonBlue}}">Изменить пароль</a>
    <a type="button" href="/login" class="{{styles.button}} {{styles.buttonRed}}">Выйти</a>
  </div>
  <div class="{{styles.popupBlock}}">
  <div class="{{styles.overlay}}"></div>
  <div class="{{styles.popup}}">
    <h2 class="{{styles.popupTitle}}">Загрузите файл</h2>
    <a class="{{styles.popupLink}}" href="#">Выбрать файл на компьютере</a>
   {{{ButtonPopup}}}
  </div>
</form>
</main>
    `;
  }
}

function profile() {
  return new Profile();
}

export default profile;
