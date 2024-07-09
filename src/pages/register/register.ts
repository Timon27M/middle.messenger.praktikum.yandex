import Handlebars from "handlebars";
import styles from './register.module.scss'
import template from './register.tmpl'
import Button from "../../components/button/button";

const Register = () => {
    return Handlebars.compile(template)({
        styles: styles,
        Button: Button('Зарегистрироваться', 'Регистрация')
    })
}

export default Register