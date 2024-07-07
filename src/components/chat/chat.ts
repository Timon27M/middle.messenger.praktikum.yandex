import styles from "./chat.module.scss";
import Handlebars from "handlebars";
import template from "./chat.tmpl";

const Chat = () => {
  const data = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlte8jVger7Istf0ctZT7Fxyn_GfHfWDg5-w&s",
      firstName: "Андрей",
      time: "12:48"
  };

  return Handlebars.compile(template)({
    styles: styles,
    data: data
  });
};

export default Chat;
