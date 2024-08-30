import Block from "../../utils/Block/Block";
import ErrorBlock from "../errorBlock/errorBlock";
import Input from "../input/input";
import styles from "./inputBlock.module.scss";

type TProps = {
  classInput: string;
  classErrorBlock: string;
  errorText: string;
  type: string;
  name: string;
  placeholder?: string
  value?: string;
  id: string;
  disabled?: boolean | undefined;
  events?: {
    blur?: () => void;
    click?: () => void;
  };
};

export class InputBlock extends Block {
  public name: string;

  public id: string;

  constructor(props: TProps) {
    super({
      styles,
      input: Input({
        class: props.classInput,
        type: props.type,
        name: props.name,
        value: props.value,
        placeholder: props.placeholder,
        id: props.id,
        disabled: props.disabled || undefined,
        events: props.events,
      }),
      errorBlock: ErrorBlock({
        class: props.classErrorBlock,
        errorText: props.errorText,
      }),
    });
    this.name = props.name;
    this.id = props.id;
  }

  getValue() {
    const element = document.getElementById(
      `${this.props.id}`,
    ) as HTMLInputElement;
    const { value } = element;
    console.log(value);
    return value;
  }

  render() {
    return `
        <div class="{{styles.inputBlock}}">
        {{{input}}}
        {{{errorBlock}}}
        </div> 
        `;
  }
}

function inputBlock(props: TProps) {
  return new InputBlock(
    ({
      ...props,
    }),
  );
}

export default inputBlock;
