import { Input } from "../components/input/input";
import { InputBlock } from "../components/inputBlock/inputBlock";
import { IChatCard, CSSModuleClasses } from "./types";
import { regexps } from "./constants";
import { ErrorBlock } from "../components/errorBlock/errorBlock";
import { ErrorFormBlock } from "../components/errorFormBlock/errorFormBlock";

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

export function submitForm(
  evt: Event,
  childrenObj: object,
  errorFormBlock: ErrorFormBlock
) {
  evt.preventDefault();
  const formData: Record<string, string> = {};

  const array = Object.values(childrenObj).filter((child) => {
    return (
      child.id === "password" ||
      child.id === "login" ||
      child.id === "email" ||
      child.id === "first_name" ||
      child.id === "second_name" ||
      child.id === "oldPassword" ||
      child.id === "newPassword" ||
      child.id === "newPasswordAgain" ||
      child.id === "display_name" ||
      child.id === "passwordAgain"
    );
  });

  array.forEach((inputBlock: InputBlock) => {
    formData[inputBlock.children.input.name] =
      inputBlock.children.input.getValue();
  });

  const isValid = Object.entries(formData).every(([key, value]) => {
    return validate(value, key);
  });

  if (isValid === false) {
    errorFormBlock.setProps({ text: "Данные заполнены неправильно" });
  } else {
    errorFormBlock.setProps({ text: "" });
  }

  console.log(formData);

  return { formData, isValid };
}

function validate(value: string, name: string) {
  const valid = new RegExp(regexps[name]).test(value);

  return valid;
}

export function handleValidateInput(
  errorBlock: ErrorBlock,
  input: Input,
  text: string
) {
  const isValid = validate(input.getValue(), input.props.name);
  if (!isValid) {
    errorBlock.setProps({ errorText: text });
  } else {
    errorBlock.setProps({ errorText: "" });
  }
}
