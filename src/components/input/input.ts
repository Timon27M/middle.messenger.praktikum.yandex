import Block from "../../utils/Block/Block";

type TProps = {
  class: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  id: string;
  disabled?: boolean | undefined;
  events?: {
    blur?: () => void;
    click?: () => void;
    keyup?: (evt: KeyboardEvent) => void;
  };
};

export class Input extends Block {
  public name: string;

  class: string | undefined;

  constructor(props: TProps) {
    super(props);
    this.name = props.name;
    this.class = props.class;
  }

  getValue() {
    const element = document.getElementById(
      `${this.props.id}`
    ) as HTMLInputElement;
    const { value } = element;
    return value;
  }

  getFiles() {
    const element = document.getElementById(
      `${this.props.id}`
    ) as HTMLInputElement;
    const { files } = element;
    return files;
  }

  clearValue() {
    const element = document.getElementById(
      `${this.props.id}`
    ) as HTMLInputElement;

    element.value = "";
  }

  render() {
    const { disabled = false } = this.props;

    return `
        <input type="{{type}}" id="{{id}}" ${
          disabled === true ? "disabled" : "!disabled"
        } class="{{class}}" placeholder="{{placeholder}}" name="{{name}}" value="{{value}}" />
        `;
  }
}

function input(props: TProps) {
  return new Input(props);
}

export default input;
