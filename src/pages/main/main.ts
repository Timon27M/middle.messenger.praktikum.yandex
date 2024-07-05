import Handlebars from 'handlebars';
import template from './main.tmpl.ts';
import styles from './main.module.scss';
import Chats from '../../components/chats/chats.ts';

const Main = () => {
   return Handlebars.compile(template)({
      styles: styles,
      allChats: Chats()
   })
}

export default Main