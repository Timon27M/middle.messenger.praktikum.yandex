import styles from "./chats.module.scss";
import { chatListData } from "../../../utils/constants.ts";
import { createChatList } from "../../../utils/functions";
import { Block } from "../../../utils/Block/Block.ts";
class Chats extends Block {
  constructor() {
    super({
      styles: styles,
      chats: createChatList(chatListData, styles),
    });
  }
  render() {
    return `
<section class="{{styles.chats}}">
  <div class="{{styles.nav}}">
    <a class="{{styles.link}}" href='/profile'>Профиль<p class="{{styles.arrow}}">></p></a>
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
