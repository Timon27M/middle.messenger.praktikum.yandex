import Handlebars from "handlebars";
import styles from './button.module.scss'
import template from './button.tmpl'

const Button = (text: string, nameButton: string) => {
    return Handlebars.compile(template)({
        styles: styles,
        text: text,
        nameButton: nameButton,
    })
}

export default Button;