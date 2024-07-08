import styles from './profile.module.scss'
import template from './profile.tmpl'
import Handlebars from 'handlebars'
import ButtonBack from '../../components/buttonBack/buttonBack'

const Profile = () => {
    return Handlebars.compile(template)({
        styles: styles,
        ButtonBack: ButtonBack
    })   
}

export default Profile;