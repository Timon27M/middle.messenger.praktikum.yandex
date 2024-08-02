import styles from "./main.module.scss";
import Chats from "../../components/chats/chats";
import Block from "../../utils/Block/Block";
import DefaultChat from "../../components/defaultChat/defaultChat";
import Chat from "../../components/chat/chat";

class Main extends Block {
  constructor(chatComponent: typeof DefaultChat | typeof Chat) {
    super({
      styles,
      allChats: Chats(),
      activeChat: chatComponent(),
    });
  }

  render() {
    return `
  <main class={{styles.main}}>
    <div class="{{styles.chats}}">
        {{{allChats}}}
    </div>
     <div class={{styles.activeChat}}>
        {{{activeChat}}}
    </div>
  </main>
    `;
  }
}

function main(chatComponent: typeof DefaultChat | typeof Chat) {
  return new Main(chatComponent);
}

export default main;
