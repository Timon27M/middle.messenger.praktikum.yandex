import styles from "./buttonBack.module.scss";
import Block from "../../utils/Block/Block";

class ButtonBack extends Block {
  constructor(props?: Record<string, any>) {
    super({
      ...props,
      styles,
    });
  }

  render() {
    return `
    <div class="{{styles.backBlock}}">
        <button class="{{styles.backButton}}"><</button>
    </div>
        `;
  }
}

function buttonBack(props?: Record<string, any>) {
  return new ButtonBack(props);
}

export default buttonBack;
