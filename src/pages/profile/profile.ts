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
import { connect, store, TUserStore } from "../../utils/store/Store";
import Popup from "../../components/popup/popup";
import ButtonLink from "../../components/buttonLink/buttonLink";

type TProps = {
  currentUser: TUserStore | undefined;
};

export class Profile extends Block {
  constructor(props: TProps) {
    super({
      styles,
      avatar,
      currentUserName: props.currentUser?.first_name,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      events: {
        submit: (e: Event) => {
          this.handleSaveDataClick(e);
        },
      },
      popup: Popup({
        titlePopup: "Смена аватара",
        subTitle: "Выбрать аватар с компьютера",
        typeInput: "file",
        name: "avatarPopup",
        button: Button({
          text: "Поменять",
          nameButton: "changeAvatar",
          events: {
            click: (evt: Event) => {
              evt.preventDefault();

              const inputValue = this.children.popup.children.input.getFiles();

              if (inputValue[0]) {
                const formData = new FormData();
                formData.append("avatar", inputValue[0]);

                userController
                  .updateUserAvatar(formData)
                  .then(() => {
                    this.children.popup.setProps({ show: false });
                  })
                  .catch((err) => {
                    alert(`${err.message}`);
                  });
              }
            },
          },
        }),
      }),
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
      buttonAvatar: ButtonLink({
        class: styles.avatarButton,
        text: "",
        events: {
          click: () => {
            this.children.popup.setProps({ show: true });
          },
        },
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
        value: props.currentUser?.email,
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
        value: props.currentUser?.login,
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
        value: props.currentUser?.first_name,
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
        value: props.currentUser?.second_name,
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
        value: props.currentUser?.display_name,
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
        value: props.currentUser?.phone,
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
    authController
      .getUser()
      .catch((err) => {
        console.log(err.message);
        router.go("/");
      })
      .finally(() => {
        const data = store.getState().currentUser;
        this.changeInputValue(data);

        this.setProps({ currentUser: store.getState().currentUser });
      });
  }

  changeInputValue(data: TUserStore | undefined) {
    if (data !== undefined) {
      this.children.emailInputBlock.children.input.setProps({
        value: data.email,
      });
      this.children.loginInputBlock.children.input.setProps({
        value: data.login,
      });
      this.children.nameInputBlock.children.input.setProps({
        value: data.first_name,
      });
      this.children.surnameInputBlock.children.input.setProps({
        value: data.second_name,
      });
      this.children.nameInChatInputBlock.children.input.setProps({
        value: data.display_name,
      });
      this.children.telInputBlock.children.input.setProps({
        value: data.phone,
      });
    }
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

    router.go("/forgot-password");
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

    this.children.buttonsForm.setProps({ type: "changeBlockButton" });

    console.log(formData);

    userController
      .updateUserProfile(formData)
      .then(() => {
        this.changeInputValue(store.getState().currentUser);
      })
      .finally(() => {
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
        }
      });
  }

  render() {
    let avatarLink: string;

    if (store.getState().currentUser?.avatar) {
      avatarLink = `https://ya-praktikum.tech/api/v2/resources${
        store.getState().currentUser?.avatar
      }`;
    } else {
      avatarLink = avatar;
    }
    const currentUserName = store.getState().currentUser?.first_name;
    return `
<main class="{{styles.profile}}">
{{{ButtonBack}}}
  <form class="{{styles.container}}">
  <div class="{{styles.avatarBlock}}">
    <img class="{{styles.avatarImage}}" src="${avatarLink}" alt="avatar" />
    {{{buttonAvatar}}}
    </div>
    <h2 class="{{styles.name}}">${currentUserName || ""}</h2>
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
  </div>
  </form>
  {{{popup}}}
</main>
    `;
  }
}

function profile() {
  const withChats = connect((state) => ({
    currentUser: { ...state.currentUser },
  }));

  return withChats(Profile);
}

export default profile;
