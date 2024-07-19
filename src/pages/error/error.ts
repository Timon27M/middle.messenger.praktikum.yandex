import { Block } from "../../../utils/Block/Block";
import styles from "./error.module.scss";

type TErrorProps = {
  status: string;
  textError: string;
};

class Error extends Block {
  constructor(props: TErrorProps) {
    super({
      styles: styles,
      status: props.status,
      text: props.textError,
    });
  }

  render() {
    return `
<main class="{{styles.error}}">
  <h2 class="{{styles.status}}">{{status}}</h2>
  <p class="{{styles.text}}">{{text}}</p>
  <a class="{{styles.link}}" href="#">Назад к чатам</a>
</main>
        `;
  }
}

function error(props: TErrorProps) {
  return new Error(props);
}

export default error;
