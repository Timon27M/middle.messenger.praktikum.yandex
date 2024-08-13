import Block from "../../utils/Block/Block";
import Button from "../button/button";
import styles from "./buttonsChangeProfile.module.scss";

type TProps = {
  clickButtonChangeData: (evt: Event) => void;
  clickButtonChangePassword: (evt: Event) => void;
  clickButtonLogout: (evt: Event) => void;
};

class ButtonsBlockProfile extends Block {
  constructor(props: TProps) {
    super({
      styles,
      buttonChangeData: Button({
        type: "link",
        styleType: "link",
        nameButton: "changeData",
        text: "Изменить данные",
        color: "blue",
        events: {
          click: (evt: Event) => props.clickButtonChangeData(evt)
        },
      }),
      buttonChangePassword: Button({
        type: "link",
        styleType: "link",
        nameButton: "changePasssword",
        text: "Изменить пароль",
        color: "blue",
        events: {
          click: (evt: Event) => props.clickButtonChangePassword(evt)
        },
      }),
      buttonLogout: Button({
        type: "link",
        styleType: "link",
        nameButton: "logout",
        text: "Выйти",
        color: "red",
        events: {
          click: (evt: Event) => props.clickButtonLogout(evt)
        },
      }),
    });
  }

  //<a type="button" href="/forgot-password" class="{{styles.button}} {{styles.buttonBlue}}">Изменить пароль</a>
  render() {
    return `
        <div class="{{styles.buttons}}">
            {{{buttonChangeData}}}
            {{{buttonChangePassword}}}
            {{{buttonLogout}}}
        </div>
        `;
  }
}

function buttonsBlockProfile(props: TProps) {
  return new ButtonsBlockProfile(props);
}

export default buttonsBlockProfile;
