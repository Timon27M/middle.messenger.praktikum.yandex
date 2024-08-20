import styles from "./profile.module.scss";
import ButtonBack from "../../components/buttonBack/buttonBack";
import Button from "../../components/button/button";
import avatar from "../../utils/images/avatar.png";
import Block from "../../utils/Block/Block";
import InputBlock from "../../components/inputBlock/inputBlock";
import {
  handleValidateInput,
  collectData,
} from "../../utils/functions/functions";
import ButtonsProfile from "../../components/buttonsProfile/buttonsProfile";
import ErrorFormBlock from "../../components/errorFormBlock/errorFormBlock";
import { router } from "../../utils/navigations/Router";
import authController from "../../service/authController/AuthController";
import userController from "../../service/userController/UserController";
import chat from "../../components/chat/chat";

export class Profile extends Block {
  constructor() {
    super({
      styles,
      avatar,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      events: {
        submit: (e: Event) => {
          this.handleSaveDataClick(e);
        },
      },
      ButtonBack: ButtonBack({
        events: {
          click: () => {
            router.back();
          },
        },
      }),
      ButtonPopup: Button({
        text: "Изменить",
        type: "button",
        nameButton: "change_profile",
      }),
      buttonsForm: ButtonsProfile({
        clickButtonChangeData: (evt: Event) => this.handleChangeDataClick(evt),
        clickSavebutton: (evt: Event) => this.handleSaveDataClick(evt),
        clickButtonChangePassword: (evt: Event) =>
          this.handleChangePasswordClick(evt),
        clickButtonLogout: (evt: Event) => this.handleLogoutClick(evt),
      }),
      emailInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "email",
        name: "email",
        value: "pochta@yandex.ru",
        disabled: true,
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
        value: "ivanivanov",
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
      nameInChatInputBlock: InputBlock({
        classInput: styles.input,
        classErrorBlock: styles.textError,
        errorText: "",
        type: "text",
        name: "display_name",
        value: "Иван",
        disabled: true,
        id: "display_name",
        events: {
          blur: () =>
            handleValidateInput(
              this.children.nameInChatInputBlock.children.errorBlock,
              this.children.nameInChatInputBlock.children.input,
              "Некорректное имя"
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
        disabled: true,
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
    });
  }

  componentDidMount() {
    authController.getUser().catch((err) => {
      console.log(err.message);
      router.go("/");
    });
  }

  handleChangeDataClick(evt: Event) {
    evt.preventDefault();
    this.children.emailInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });
    this.children.nameInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });
    this.children.surnameInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });
    this.children.nameInChatInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });
    this.children.loginInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });
    this.children.telInputBlock.children.input.setProps({
      disabled: false,
      class: styles.inputActive,
    });

    this.children.buttonsForm.setProps({ type: "saveButton" });
  }

  handleChangePasswordClick(evt: Event) {
    evt.preventDefault();

    router.go("/messenger", { chatComponent: chat() });
  }

  handleLogoutClick(evt: Event) {
    evt.preventDefault();

    authController.logout();
  }

  handleSaveDataClick(evt: Event) {
    evt.preventDefault();

    const { isValid, formData } = collectData(
      evt,
      this.children,
      this.children.errorFormBlock
    );

    if (isValid) {
      this.children.emailInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });
      this.children.nameInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });
      this.children.surnameInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });
      this.children.nameInChatInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });
      this.children.loginInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });
      this.children.telInputBlock.children.input.setProps({
        disabled: true,
        class: styles.input,
      });

      this.children.buttonsForm.setProps({ type: "changeBlockButton" });

      console.log(formData);

      userController.updateUserProfile(formData);
    }
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
      <p class="{{styles.inputName}}">Имя в чате</p>
     {{{nameInChatInputBlock}}}
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Телефон</p>
      {{{telInputBlock}}}
    </div>
    <span class="{{styles.errorForm}}">{{{errorFormBlock}}}</span>
  </div>
 {{{buttonsForm}}}
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
