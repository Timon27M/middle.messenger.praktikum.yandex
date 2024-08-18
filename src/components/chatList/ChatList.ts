import chatController from "../../service/chatController/ChatController";
import Block from "../../utils/Block/Block";
import { TChatStore } from "../../utils/store/Store";
import ChatItem from "../chatItem/ChatItem";

class ChatList extends Block {
  chatsArr?: TChatStore[] | undefined;

  constructor(chatsArr?: TChatStore[] | undefined) {
    super();
    this.chatsArr = chatsArr;
  }

 createChats(array: TChatStore[] | undefined) {
      if (array) {
        const chatComponents = array.map((chat) => {
           return  ChatItem({
              id: chat.id,
              avatar: chat.avatar,
              title: chat.title,
              created_by: chat.created_by,
              last_message: chat.last_message,
              unread_count: chat.unread_count,
            })
        });

        return chatComponents

      }

      return undefined;
    };

   render() {
    const chats = this.createChats(this.chatsArr);
    console.log(chats);

    if (chats !== undefined) {
      return `
            ${chats.map((chat) => {
              if (chat) {
                return `{{{chat}}}`;
              }
            })}
        `;
    }
      return "efwef";
  }
}

function chatList(props: TChatStore[] | undefined) {
  return new ChatList(props);
}

export default chatList;
