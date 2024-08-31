import chatItem from "../../components/chatItem/ChatItem";
import { TChatStore } from "../store/Store";

export default function renderChatsList(chatList: TChatStore[]) {
  if (chatList !== undefined && chatList.length > 0) {
    const chatComponents = chatList.map((chat) => {
      const chatTest = chatItem(chat);

      return chatTest;
    });
    return chatComponents;
  }
  return undefined;
}
