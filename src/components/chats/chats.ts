import styles from "./chats.module.scss";
import Block from "../../utils/Block/Block";
import { router } from "../../utils/navigations/Router";
import Button from "../button/button";
import { connect, TChatStore } from "../../utils/store/Store";
import ChatList from "../chatList/ChatList";

export type TProps = {
  chatList: TChatStore[] | undefined;
};

class Chats extends Block {
  constructor(props: TProps) {
    super({
      styles,
      chats: ChatList(),
      chatList: props.chatList,
      // chats: createChatList(props.chatList, styles),
      buttonChangeData: Button({
        type: "link",
        styleType: "link",
        nameButton: "changePage",
        text: "Профиль >",
        color: "gray",
        events: {
          click: () => {
            router.go("/settings");
          },
        },
      }),
    });
  }

  // <a class="{{styles.link}}" href='/profile'>Профиль<p class="{{styles.arrow}}">></p></a>
  // <div class="{{styles.chats-list}}">{{{chats}}}</div>
  
  render() {
    // if (this.props.chatList !== undefined) {
      // const chatComponents = this.props.chatList.map((chat) => {
      //   return chatItem({
      //     id: chat.id,
      //     avatar: chat.avatar,
      //     title: chat.title,
      //     created_by: chat.created_by,
      //     last_message: chat.last_message,
      //     unread_count: chat.unread_count,
      //   });
      // });
      
      // return chatComponents;
    // }

    return `
    <section class="{{styles.chats}}">
    <div class="{{styles.nav}}">
    {{{buttonChangeData}}}
    <input name="message" class="{{styles.input}}" type="text" placeholder="Поиск" />
    </div>
    <div class="{{styles.chats-list}}">{{{chats}}}</div>
</section>
    `;
  }
}

function chats() {
  
  const withChats = connect((state) => ({
    chatList: state.chatList || [],
  }));
  
  const component = withChats(Chats)

  return new component()

  // return withChats(Chats)
}

export default chats;
// class Chats extends Block {
//   constructor(props: TProps) {
//     super({
//       styles,
//       chats: ChatList(props.chatList),
//       // chats: createChatList(props.chatList, styles),
//       buttonChangeData: Button({
//         type: "link",
//         styleType: "link",
//         nameButton: "changePage",
//         text: "Профиль >",
//         color: "gray",
//         events: {
//           click: () => {
//             router.go("/settings");
//           },
//         },
//       }),
//     });
//   }

//   // <a class="{{styles.link}}" href='/profile'>Профиль<p class="{{styles.arrow}}">></p></a>
//   // <div class="{{styles.chats-list}}">{{{chats}}}</div>
  
//   render() {
//     return `
//     <section class="{{styles.chats}}">
//     <div class="{{styles.nav}}">
//     {{{buttonChangeData}}}
//     <input name="message" class="{{styles.input}}" type="text" placeholder="Поиск" />
//     </div>
//     <div class="{{styles.chats-list}}">{{{chats}}}</div>
// </section>
//     `;
//   }
// }

// function chats(props: TProps) {
//   const withChats = connect((state) => ({
//     currentChatId: state.currentChatId,
//     currentUser: state.currentUser,
//     chatList: state.chatList || [],
//     messageList: state.messageList || [],
//     searchValue: state.searchValue || "",
//   }));

//   return withChats(Chats)
// }

// export default chats;
// function chats(props: TProps) {
//   return new Chats(props);
// }

// export default chats;
