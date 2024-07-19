import { Block } from "../../../utils/Block/Block";
import styles from "./button.module.scss";
class Button extends Block {
  constructor(props: Record<string, any>) {
    super(props);
  }

  render() {
    return `
        <button name={{nameButton}} class="{{styles.button}}">{{text}}</button>
`;
  }
}

function button(props: Record<string, any>) {
  return new Button(
    (props = {
      styles: styles,
      ...props,
    })
  );
}

export default button;
