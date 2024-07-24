import { Block } from "../../../utils/Block/Block";

type TProps = {
    class: string,
    type: string,
    name: string,
    value: string,
    id: string,
    disabled?: boolean | undefined,
    events?: {
        blur?: () => void;
        click?: () => void;
    }
}

export class Input extends Block {
    public name: string;
    constructor(props: TProps) {
        super(props)
        this.name = props.name;
    }

    getValue() {
        const element = document.getElementById(
          `${this.props.id}`
        ) as HTMLInputElement;
        const value = element.value;
        return value;
      }

    render() {
        const { disabled = false } = this.props

        return `
        <input type="{{type}}" id="{{id}}" ${disabled === true ? 'disabled' : '!disabled'} class="{{class}}" name="{{name}}" value="{{value}}" />
        `
    }
 }

 function input(props: TProps) {
 return new Input(props)
 }

 export default input;