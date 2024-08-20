import Block from "../../utils/Block/Block";
import { store, TChatStore } from "../../utils/store/Store";
import styles from "./ChatItem.module.scss";

import defaultAvatar from "../../utils/images/avatar.png"

type TProps = {
  events?: {
    click?: () => void;
  };
} & TChatStore 

export class ChatItem extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      styles: styles,
      id: props.id,
      avatar: props.avatar,
      title: props.title,
      created_by: props.created_by,
      last_message: props.last_message,
      time: props.last_message?.time,
      unread_count: props.unread_count,
      events: {
        click: () => console.log("WEGFUW")
      }
    });
  }

//   <div class="{{styles.chat}}" key={{id}} id={{id}}>
//     <img class="{{styles.image}}" src="{{avatar}}" alt="image">
//     <div>
//         <p class="{{styles.firstName}}">{{title}}</p>
//         <div class="{{styles.lastMessageBlock}}">
//         ${owner === true ? "<p class={{styles.owner}}>Вы: </p>" : ""}
//         <p class={{styles.lastMessageText}}>{{last_message}}</p></div>
//     </div>
//     <div class="{{styles.info}}}">
//         <p class="{{styles.time}}">{{last_message.time}}</p>
//         ${
//           owner === true
//             ? "<span class={{styles.messageUnread}}>{{unread_count}}</span>"
//             : ""
//         }
//     </div>
// </div>
  render() {
    const owner = this.props.created_by === store.getState().currentUser?.id;
    const { avatar, last_message, unread_count } = this.props;

    const data = new Date(last_message?.time).toLocaleTimeString()
    return `
      <div class="{{styles.chat}}" key={{id}} id={{id}}>
    <img class="{{styles.image}}" src="${avatar === null ? defaultAvatar : avatar}" alt="image">
    <div class="{{styles.container}}">
        <p class="{{styles.firstName}}">{{title}}</p>
        <div class="{{styles.lastMessageBlock}}">
        ${owner === true ? "<p class={{styles.owner}}>Вы: </p>" : ""}
        <p class={{styles.lastMessageText}}>{{last_message.content}}</p></div>
    </div>
    <div class="{{styles.info}}">
        <p class="{{styles.time}}">${data !== "Invalid Date" ? data : ""}</p>
        ${
          unread_count !== 0
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
