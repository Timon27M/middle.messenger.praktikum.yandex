import Block from "../../utils/Block/Block";
import styles from "./errorFormBlock.module.scss";

type TProps = {
  text: string;
};

export class ErrorFormBlock extends Block {
  constructor(props: TProps) {
    super({
      styles,
      text: props.text,
    });
  }

  render() {
    return `
        <p class="{{styles.textError}}">{{text}}</p>
        `;
  }
}

function errorFormBlock(props: TProps) {
  return new ErrorFormBlock(props);
}

export default errorFormBlock;
