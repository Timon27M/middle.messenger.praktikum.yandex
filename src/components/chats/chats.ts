import styles from "./chats.module.scss";
import { chatListData } from "../../utils/constants";
import { createChatList } from "../../utils/functions/functions";
import Block from "../../utils/Block/Block";
import ButtonLink from "../buttonLink/buttonLink";
import { router } from "../../utils/navigations/Router";
import Button from "../button/button";
import { store, TChatStore } from "../../utils/store/Store";
import ChatList from "../chatList/ChatList";

export type TProps = {
  chatList: TChatStore[] | undefined;
};

export default class Chats extends Block {
  constructor(props: TProps) {
    super({
      styles,
      chats: ChatList(props.chatList),
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

  render() {
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

// function chats(props: TProps) {
//   return new Chats(props);
// }

// export default chats;
