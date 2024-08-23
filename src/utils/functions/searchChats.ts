import { store } from "../store/Store";

export default function searchChat(value: string) {
  const allChats = store.getState().chatList;

  const newChatsList = allChats?.filter((chat) => {
    return chat.title.toLowerCase().includes(value.toLowerCase());
  });

  return { newChatsList };
}
