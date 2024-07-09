import Handlebars from "handlebars";
import styles from './error.module.scss'
import template from './error.tmpl'

const Error = (status: string, text: string) => {
    return Handlebars.compile(template)({
        styles: styles,
        status: status,
        text: text,
    })
}

export default Error;
