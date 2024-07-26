import { Block } from "../../utils/Block/Block";
import Button from "../button/button";
import styles from "./buttonsChangeProfile.module.scss";

type TProps = {
  events: {
    click: (evt: Event) => void;
  };
};

class ButtonsBlockProfile extends Block {
  constructor(props: TProps) {
    super({
      styles: styles,
      buttonChangeData: Button({
        type: "link",
        styleType: "link",
        nameButton: "changeData",
        text: "Изменить данные",
        events: props.events,
      }),
    });
  }

  render() {
    return `
        <div class="{{styles.buttons}}">
            {{{buttonChangeData}}}
            <a type="button" href="/forgot-password" class="{{styles.button}} {{styles.buttonBlue}}">Изменить пароль</a>
            <a type="button" href="/login" class="{{styles.button}} {{styles.buttonRed}}">Выйти</a>
        </div>
        `;
  }
}

function buttonsBlockProfile(props: TProps) {
  return new ButtonsBlockProfile(props);
}

export default buttonsBlockProfile;
