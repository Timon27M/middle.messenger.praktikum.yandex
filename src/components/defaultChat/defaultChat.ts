import Block from "../../utils/Block/Block";
import styles from "./defaultChat.module.scss";

export class DefaultChat extends Block {
  constructor() {
    super({
      styles,
    });
  }

  render() {
    return `
    <section class={{styles.emptyChat}}>
        <p class={{styles.text}}>Выберите чат чтобы отправить сообщение</p>
    </section>
        `;
  }
}

function defaultChat() {
  return new DefaultChat();
}

export default defaultChat;
