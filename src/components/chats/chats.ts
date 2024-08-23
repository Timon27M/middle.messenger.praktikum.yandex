import styles from "./chats.module.scss";
import Block from "../../utils/Block/Block";
import { router } from "../../utils/navigations/Router";
import Button from "../button/button";
import Input from "../input/input";

export type TProps = {
  // chatList: TChatStore[] | undefined;
  searchFunction: () => void;
};

class Chats extends Block {
  constructor() {
    super({
      styles,
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
      input: Input({
        class: styles.input,
        type: "text",
        name: "inputSearch",
        id: "inputSearch",
        placeholder: "Поиск",
      }),
      buttonCreateChat: Button({
        text: "Создать чат",
        nameButton: "createChat",
      }),
    });
  }

  render() {
    return `
    <section class="{{styles.chats}}">
    <div class="{{styles.nav}}">
    {{{buttonChangeData}}}
    <div class={{styles.container}}>
    {{{buttonCreateChat}}}
    </div>
    {{{input}}}
    </div>
    </section>
    `;
  }
}

function chats() {
  return new Chats();
}

export default chats;
