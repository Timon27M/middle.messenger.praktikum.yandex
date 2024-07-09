import Handlebars from "handlebars";
import styles from './forgotPassword.module.scss'
import template from './forgotPassword.tmpl'
import Button from "../../components/button/button";
import avatar from '../../../utils/images/avatar.png'

const ForgotPassword = () => {
    return Handlebars.compile(template)({
        styles: styles,
        Button: Button('Сохранить'),
        avatar: avatar
    })
}

export default ForgotPassword