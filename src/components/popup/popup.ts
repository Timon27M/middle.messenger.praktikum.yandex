import Block from "../../utils/Block/Block";
import { Button } from "../button/button";
import buttonLink from "../buttonLink/buttonLink";
import Input from "../input/input";
import styles from "./popup.module.scss";

type TProps = {
  titlePopup: string;
  typeInput: "file" | "text";
  subTitle?: string;
  show?: boolean;
  placeholder?: string;
  name: string;
  button: Button;
};

class Popup extends Block {
  constructor(props: TProps) {
    super({
      styles,
      show: props.show || false,
      titlePopup: props.titlePopup,
      subTitle: props.subTitle,
      button: props.button,
      id: props.name,
      input: Input({
        class: styles.inputPopup,
        type: props.typeInput,
        name: props.name,
        id: props.name,
        placeholder: props.placeholder,
      }),
      buttonHidePopup: buttonLink({
        class: styles.buttonHide,
        text: "Х",
        events: {
          click: () => {
            this.setProps({ show: false });
          },
        },
      }),
    });
  }

  render() {
    const { subTitle, show } = this.props;

    return `
<div class="{{styles.popupBlock}}" style="${
      show === false ? "display: none;" : "display: flex;"
    }">
  <div class={{styles.overlay}}></div>
  <div class="{{styles.popup}}">
    <h2 class="{{styles.popupTitle}}">{{titlePopup}}</h2>
    ${subTitle ? `<p>${subTitle}</p>` : ""}
    {{{input}}}
   {{{button}}}
   {{{buttonHidePopup}}}
  </div>
  </div>`;
  }
}

function popup(props: TProps) {
  return new Popup(props);
}

export default popup;
