import Block from "../../utils/Block/Block";
import { connect, TMessageStore } from "../../utils/store/Store";

type TProps = {
    messageList: TMessageStore[] | undefined
}

class ActiveChat extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }
}

function activeChat(props: TProps) {
  const withChats = connect((state) => ({
    messageList: state.messageList || undefined,
  }));

  return withChats(ActiveChat);
}

export default activeChat;
