import Block from "../../utils/Block/Block";
import { store, TMessageStore } from "../../utils/store/Store";
import styles from "./message.module.scss";

class Message extends Block {
  constructor(props: TMessageStore) {
    super({
      styles,
      text: props.content,
      time: props.time,
      userId: props.user_id,
    });
  }

  render() {
    const { time } = this.props;
    const data = new Date(time).toLocaleTimeString();

    let messageStyle;

    if (this.props.userId === store.getState().currentUser?.id) {
        messageStyle = "margin-left: auto;";
    } else {
      messageStyle = "";
    }

    return `
    <div class={{styles.messageOwner}} style="${messageStyle}" >
      <p class="{{styles.messageText}}">{{text}}</p>
      <p class={{styles.time}}>${data}</p>
    </div>
        `;
  }
}

function message(props: TMessageStore) {
  return new Message(props);
}

export default message;
