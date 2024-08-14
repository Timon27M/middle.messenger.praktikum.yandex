import styles from "./login.module.scss";
import Button from "../../components/button/button";
import Block from "../../utils/Block/Block";
import InputBlock from "../../components/inputBlock/inputBlock";
import { handleValidateInput, collectData } from "../../utils/functions";
import ErrorFormBlock from "../../components/errorFormBlock/errorFormBlock";
import { router } from "../../utils/navigations/Router";
import authApi, { TLoginData } from "../../utils/api/AuthApi";

export class Login extends Block {
  constructor() {
    super({
      styles,
      errorFormBlock: ErrorFormBlock({
        text: "",
      }),
      button: Button({
        text: "Войти",
        nameButton: "send_login",
        events: {
          click: (e) => {
            this.setProps({ textError: "blalba" });
            const { formData } = collectData(
              e,
              this.children,
              this.children.errorFormBlock
            );
            // console.log(formData);
            authApi
              .login(formData as TLoginData)
              .then(() => {
                router.go("/messenger");
              })
              .catch((err) => console.log(err.message));
          },
        },
      }),
      buttonRegister: Button({
        type: "link",
        styleType: "link",
        nameButton: "changePage",
        text: "Нет аккаунта?",
        color: "blue",
        events: {
          click: (evt: Event) => {
            evt.preventDefault();
            router.go("/sign-up");
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

  componentDidMount(): void {
    authApi.getUser().then(() => {
      router.go("/messenger");
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
      {{{buttonRegister}}}
  </form>
</main>
    `;
  }
}

function login() {
  return new Login();
}

function func(block: typeof Block) {
  return block;
}

func(Login);

export default login;
