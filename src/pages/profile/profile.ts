import styles from './profile.module.scss'
import template from './profile.tmpl'
import Handlebars from 'handlebars'
import ButtonBack from '../../components/buttonBack/buttonBack'
import Button from '../../components/button/button';
import avatar from '../../../utils/images/avatar.png'

const Profile = () => {
    return Handlebars.compile(template)({
        styles: styles,
        ButtonBack: ButtonBack,
        ButtonPopup: Button('Поменять'),
        avatar: avatar
    })   
}

export default Profile;