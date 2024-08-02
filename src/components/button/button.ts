import Block from "../../utils/Block/Block";
import styles from "./button.module.scss";

type TButton = {
  text: string;
  nameButton: string;
  styleType?: string;
  type?: string;
  events?: {
    click?: (evt: Event) => void;
  };
};

type TButtonWithClass = TButton & {
  styles?: CSSModuleClasses;
};
class Button extends Block {
  constructor(props: TButtonWithClass) {
    super(props);
  }

  render() {
    const { type = "button" } = this.props;

    return `
        <button name={{nameButton}} class="${
  type === "button" ? "{{styles.button}}" : "{{styles.buttonLink}}"
}">{{text}}</button>
`;
  }
}

function button(props: TButton) {
  return new Button({
    styles,
    ...props,
  });
}

export default button;
