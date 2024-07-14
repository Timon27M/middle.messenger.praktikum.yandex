import styles from './defaultChat.module.scss';
import template from './defaultChat.tmpl'
import Handlebars from 'handlebars';

const DefaultChat = () => {
    return Handlebars.compile(template)({
        styles: styles
    })
}

export default DefaultChat;
