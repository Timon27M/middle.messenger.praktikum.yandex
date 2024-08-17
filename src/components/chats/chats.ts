import styles from "./chats.module.scss";
import { chatListData } from "../../utils/constants";
import { createChatList } from "../../utils/functions/functions";
import Block from "../../utils/Block/Block";
import ButtonLink from "../buttonLink/buttonLink";
import { router } from "../../utils/navigations/Router";
import Button from "../button/button";

class Chats extends Block {
  constructor() {
    super({
      styles,
      chats: createChatList(chatListData, styles),
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

function chats() {
  return new Chats();
}

export default chats;
