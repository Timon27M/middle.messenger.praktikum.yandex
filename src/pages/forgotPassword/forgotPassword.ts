import Handlebars from "handlebars";
import styles from './forgotPassword.module.scss'
import template from './forgotPassword.tmpl'
import Button from "../../components/button/button";
import avatar from '../../../utils/images/avatar.png'

const ForgotPassword = () => {
    const data = {
        text: 'Сохранить',
        nameButton: 'Отправка'
    }

    console.log(`${Button(data).element}`)

    return Handlebars.compile(template)({
        styles: styles,
        Button: `${Button(data).element}`,
        avatar: avatar
    })
}

export default ForgotPassword;
