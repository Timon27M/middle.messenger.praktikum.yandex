import Handlebars from "handlebars";
import styles from './button.module.scss'
import template from './button.tmpl'

const Button = (text: string) => {
    return Handlebars.compile(template)({
        styles: styles,
        text: text
    })
}

export default Button;