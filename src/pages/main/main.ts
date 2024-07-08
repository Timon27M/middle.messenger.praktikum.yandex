import Handlebars from "handlebars";
import template from "./main.tmpl.ts";
import styles from "./main.module.scss";
import Chats from "../../components/chats/chats.ts";
import DefaultChat from "../../components/defaultChat/defaultChat.ts";
import Chat from "../../components/chat/chat.ts";

const Main = (chatComponent: () => string) => {

  return Handlebars.compile(template)({
   styles: styles,
   allChats: Chats(),
   activeChat: chatComponent(),
 });
};

export default Main;
