import Message from "../../components/message/message";
import { store } from "../store/Store";

export default function createMessageList() {
  const { messageList } = store.getState();
  if (messageList !== undefined) {
    const messageComponents = messageList.map((messageData) => {
      return Message(messageData);
    });

    return messageComponents;
  }
  return "";
}
