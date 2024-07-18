// import Handlebars from "handlebars";
// import styles from './button.module.scss'
// import template from './button.tmpl'

// const Button = (text: string, nameButton: string) => {
//     return Handlebars.compile(template)({
//         styles: styles,
//         text: text,
//         nameButton: nameButton,
//     })
// }

// export default Button;

import { Block } from '../../../utils/Block/Block'
import styles from './button.module.scss'

class Button extends Block {
    constructor(props: Record<string, any>) {
        super(props)
    }

    render() {
        return `
        <button name={{nameButton}} class="{{styles.button}}">{{text}}</button>
`
    }
}

function button(props: Record<string, any>) {
    return new Button(props = {
        styles: styles,
        ...props
    })
}

export default button