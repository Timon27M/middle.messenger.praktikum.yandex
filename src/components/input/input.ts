import { Block } from "../../../utils/Block/Block";

type TProps = {
    class: string,
    type: string,
    name: string,
    value: string,
    disabled?: boolean | undefined,
    events?: {
        blur?: () => void;
    }
}

class Input extends Block {
    constructor(props: TProps) {
        super(props)
    }

    render() {
        let disabledInput

        if (this.props.disabled === undefined) {
            disabledInput = '!'
        } else {
            disabledInput = ''
        }
        return `
        <input type="{{type}}" ${disabledInput}disabled class="{{class}}" name="{{name}}" value="{{value}}" />
        ` 
    }
}

function input(props: TProps) {
    return new Input(props = {
        ...props,
    })
}

export default input;
