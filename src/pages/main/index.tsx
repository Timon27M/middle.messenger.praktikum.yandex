import Handlebars from 'handlebars';
import template from './main.tmpl.ts'

const Main = () => {
   return Handlebars.compile(template)({
    text: 'ttttt',
    buttonText: 'qqqqq'
   })
}

export default Main