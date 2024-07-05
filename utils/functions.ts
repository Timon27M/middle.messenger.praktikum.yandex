import { IChatCard, CSSModuleClasses } from "./types";

export function createChatList(arr: IChatCard[], styles: CSSModuleClasses) {
  const chatCardLayout = arr.map((item) => {
    return `
    <div class="${styles.chat}">
        <img class="${styles.image}" src="${item.image}" alt="">
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
