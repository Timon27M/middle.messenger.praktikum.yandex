import Block from "../../utils/Block/Block";
import styles from "./button.module.scss";
import "../../styles/constants.scss";

type TButton = {
  text: string;
  nameButton: string;
  styleType?: string;
  color?: "blue" | "red" | "gray";
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
    const { type = "button", color = "blue" } = this.props;

    let styleColor: string;

    if (color === "blue") {
      styleColor = "#3369f3";
    } else if (color === "red") {
      styleColor = "#f00";
    } else {
      styleColor = "#999";
    }

    return `
        <button name={{nameButton}} ${
          type !== "button" && `style="color: ${styleColor}"`
        } class="${
      type === "button" ? "{{styles.button}}" : `{{styles.buttonLink}}`
    }">{{text}}</button>
`;
  }
}

function button(props: TButtonWithClass) {
  return new Button({
    styles,
    ...props,
  });
}

export default button;
