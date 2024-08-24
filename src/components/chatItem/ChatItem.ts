import Block from "../../utils/Block/Block";
import { store, TChatStore } from "../../utils/store/Store";
import styles from "./ChatItem.module.scss";

import defaultAvatar from "../../utils/images/avatar.png";
import Chat from "../chat/chat";

type TProps = TChatStore;

export class ChatItem extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      styles,
      id: props.id,
      avatar: props.avatar,
      title: props.title,
      createdBy: props.created_by,
      lastMessage: props.last_message,
      time: props.last_message?.time,
      unreadCount: props.unread_count,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          store.set(
            "currentChat",
            Chat({
              id: props.id,
              title: props.title,
              image: props.avatar,
              ownerId: props.created_by,
            })
          );
        },
      },
    });
  }

  render() {
    const owner = this.props.createdBy === store.getState().currentUser?.id;
    const { avatar, lastMessage, unreadCount } = this.props;

    const data = new Date(lastMessage?.time).toLocaleTimeString();
    return `
      <div class="{{styles.chat}}" key={{id}} id={{id}}>
    <img class="{{styles.image}}" src="${
      avatar === null ? defaultAvatar : avatar
    }" alt="image">
    <div class="{{styles.container}}">
        <p class="{{styles.firstName}}">{{title}}</p>
        <div class="{{styles.lastMessageBlock}}">
        ${owner === true ? "<p class={{styles.owner}}>Вы: </p>" : ""}
        <p class={{styles.lastMessageText}}>{{last_message.content}}</p></div>
    </div>
    <div class="{{styles.info}}">
        <p class="{{styles.time}}">${data !== "Invalid Date" ? data : ""}</p>
        ${
          unreadCount !== 0
            ? "<span class={{styles.messageUnread}}>{{unread_count}}</span>"
            : ""
        }
    </div>
</div>
     `;
  }
}

function chatItem(props: TProps) {
  return new ChatItem(props);
}

export default chatItem;
