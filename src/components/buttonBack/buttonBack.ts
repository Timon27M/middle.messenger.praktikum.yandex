import Handlebars from "handlebars";
import styles from './buttonBack.module.scss';
import template from './buttonBack.tmpl';

const ButtonBack = () => {
    return Handlebars.compile(template)({
        styles: styles
    })
}

export default ButtonBack;