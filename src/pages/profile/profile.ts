import styles from './profile.module.scss'
import template from './profile.tmpl'
import Handlebars from 'handlebars'

const Profile = () => {
    return Handlebars.compile(template)({
        styles: styles
    })   
}

export default Profile;