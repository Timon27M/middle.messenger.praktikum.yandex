import { Block } from "../../../utils/Block/Block";
import styles from "./button.module.scss";

type TButton = {
  text: string,
  nameButton: string,
  events?: {
    click?: (evt: Event) => void
  }
}

type TButtonWithClass = TButton & {
  styles?: CSSModuleClasses,
  
}
class Button extends Block {
  constructor(props: TButtonWithClass) {
    super(props);
  }

  render() {
    return `
        <button name={{nameButton}} class="{{styles.button}}">{{text}}</button>
`;
  }
}

function button(props: TButton) {
  return new Button(
    ({
      styles: styles,
      ...props,
    })
  );
}

export default button;
