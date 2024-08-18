import Block from "../../utils/Block/Block";
import { store, TChatStore } from "../../utils/store/Store";
import styles from "./ChatItem.module.scss";

class ChatItem extends Block {
  constructor(props: TChatStore) {
    super({
      ...props,
      styles,
      id: props.id,
      avatar: props.avatar,
      title: props.title,
      created_by: props.created_by,
      last_message: props.last_message,
      unread_count: props.unread_count
    });
  }

  render() {
    const owner = this.props.created_by === store.getState().currentUser?.id;
    return `
      <div class="{{styles.chat}}" key={{id}} id={{id}}>
        <img class="{{styles.image}}" src="{{avatar}}" alt="image">
        <div>
            <p class="{{styles.firstName}}">{{title}}</p>
            <div class="{{styles.lastMessageBlock}}">
            ${owner === true ? "<p class={{styles.owner}}>Вы: </p>" : ""}
            <p class={{styles.lastMessageText}}>{{last_message}}</p></div>
        </div>
        <div class="{{styles.info}}}">
            <p class="{{styles.time}}">{{last_message.time}}</p>
            ${
              owner === true
                ? "<span class={{styles.messageUnread}}>{{unread_count}}</span>"
                : ""
            }
        </div>
    </div>
     `;
  }
}

function chatItem(props: TChatStore) {
  return new ChatItem(props);
}

export default chatItem;
