import { InputBlock } from "../src/components/inputBlock/inputBlock";
import { IChatCard, CSSModuleClasses } from "./types";

export function createChatList(arr: IChatCard[], styles: CSSModuleClasses) {
  const chatCardLayout = arr.map((item, index) => {
    return `
    <div class="${styles.chat}" key=${index} id=${index}>
        <img class="${styles.image}" src="${item.image}" alt="image">
        <div>
            <p class="${styles.firstName}">${item.firstName}</p>
            <div class="${styles.lastMessageBlock}">
            ${item.owner === true ? `<p class=${styles.owner}>Вы: </p>` : ""}
            <p class=${styles.lastMessageText}>${item.lastMessage}</p></div>
        </div>
        <div class="${styles.info}">
            <p class="${styles.time}">${item.time}</p>
            ${
              item.owner === true
                ? `<span class="${styles.messageUnread}">2</span>`
                : ""
            }
        </div>
    </div>
        `;
  });
  const chatCardsLayout = chatCardLayout.join("");

  return chatCardsLayout;
}

export function submitForm(evt: Event, childrenObj: object) {
  evt.preventDefault();
  const formData: Record<string, string> = {};

  const array = Object.values(childrenObj).filter((child) => {
    return (
      child.props.id === "password" ||
      child.props.id === "login" ||
      child.props.id === "email" ||
      child.props.id === "first_name" ||
      child.props.id === "second_name" ||
      child.props.id === "oldPassword" ||
      child.props.id === "newPassword" ||
      child.props.id === "newPasswordAgain" ||
      child.props.id === "passwordAgain"
    );
  });

  array.forEach((input: InputBlock) => {
    formData[input.name] = input.getValue();
  });

  console.log(formData);
  return formData;
}

export function handleBlur(errorBlock: InputBlock, text: string) {
  errorBlock.setProps({ errorText: text })
}