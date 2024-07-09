import Handlebars from "handlebars";
import styles from './login.module.scss'
import template from './login.tmpl'
import Button from "../../components/button/button";

const Login = () => {
    return Handlebars.compile(template)({
        styles: styles,
        Button: Button('Авторизоваться', 'Вход')
    })
}

export default Login;
