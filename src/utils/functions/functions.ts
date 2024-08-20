import { Input } from "../../components/input/input";
import { InputBlock } from "../../components/inputBlock/inputBlock";
import { IChatCard, CSSModuleClasses } from "../types";
import { regexps } from "../constants";
import { ErrorBlock } from "../../components/errorBlock/errorBlock";
import { ErrorFormBlock } from "../../components/errorFormBlock/errorFormBlock";
import { TChatStore } from "../store/Store";

function validate(value: string, name: string) {
  const valid = new RegExp(regexps[name]).test(value);

  return valid;
}

export function collectData(
  evt: Event,
  childrenObj: object,
  errorFormBlock: ErrorFormBlock
) {
  evt.preventDefault();
  const formData: Record<string, string> = {};

  const array = Object.values(childrenObj).filter(
    (child) =>
      child.id === "password" ||
      child.id === "login" ||
      child.id === "email" ||
      child.id === "phone" ||
      child.id === "first_name" ||
      child.id === "second_name" ||
      child.id === "oldPassword" ||
      child.id === "newPassword" ||
      child.id === "newPasswordAgain" ||
      child.id === "display_name" ||
      child.id === "passwordAgain"
  );

  array.forEach((inputBlock: InputBlock) => {
    formData[inputBlock.children.input.name] =
      inputBlock.children.input.getValue();
  });

  const isValid = Object.entries(formData).every(([key, value]) =>
    validate(value, key)
  );

  if (isValid === false) {
    errorFormBlock.setProps({ text: "Данные заполнены неправильно" });
    throw Error("Данные заполнены неправильно");
  } else {
    errorFormBlock.setProps({ text: "" });
  }

  return { formData, isValid };
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