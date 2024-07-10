import styles from "./chats.module.scss";
import Handlebars from "handlebars";
import template from "./chats.tmpl.ts";
import { chatListData } from '../../../utils/constants.ts'
import { createChatList } from '../../../utils/functions'

const Chats = () => {

  return Handlebars.compile(template)({
    styles: styles,
    chats: createChatList(chatListData, styles),
  });
};

export default Chats;
