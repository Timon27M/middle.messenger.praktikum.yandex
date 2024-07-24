import { Block } from "../../../utils/Block/Block";

type TProps = {
    class: string,
    errorText: string
}

export class ErrorBlock extends Block {
    constructor(props: TProps) {
        super(props)
    }

    render() {
        return `
        <span class="{{class}}">{{errorText}}</span>
        `
    }
}

function errorBlock(props: TProps) {
    return new ErrorBlock(props)
}

export default errorBlock;
