import chatController from "../../service/chatController/ChatController";
import Block from "../../utils/Block/Block";
import { connect, TChatStore } from "../../utils/store/Store";
import ChatItem from "../chatItem/ChatItem";

type TProps = {
  chatList: TChatStore[] | undefined;
};

class ChatList extends Block {
    chats: any
    newProps: TProps
    chatList: TChatStore[] | undefined

  constructor(props: TProps) {
    super({
      ...props,
      chatsData: props.chatList,
    });
    this.chatList = props.chatList
    
    this.chats = this.createChats(props.chatList)
    this.newProps = props;
  }

  createChats(array: TChatStore[] | undefined) {
    if (this.chatList !== undefined) {
      const chatComponents = this.chatList.map((chat) => {
        return ChatItem({
          id: chat.id,
          avatar: chat.avatar,
          title: chat.title,
          created_by: chat.created_by,
          last_message: chat.last_message,
          unread_count: chat.unread_count,
        });
      });

      return chatComponents;
    }

    return undefined;
  }

  render() {

    // const chats = this.createChats(this.chatsArr);
    // console.log(chats);

    // if (chats !== null && chats !== undefined) {
    //     console.log(chats)
    //   return `
    //         ${chats.map((chat) => {
    //           if (chat) {
    //             console.log(chat);
    //             return `{{{chat}}}`;
    //           }
    //         })}
    //     `;
    // }
    // return "efwef";
    return `
        <div>{{{chatCards}}}</div>
    `;
  }
}

function chatList() {
  //   return new ChatList(props);
  const withChats = connect((state) => ({
    chatList: state.chatList || [],
  }));

  const component = withChats(ChatList);

  return new component();
}

export default chatList;
