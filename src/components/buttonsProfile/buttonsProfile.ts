import { Block } from "../../../utils/Block/Block";
import Button from "../button/button";
import ButtonsBlockProfile from "../buttonsChangeProfile/buttonsChangeProfile";

type TProps = {
    type?: string,
    clickChangeButton: (evt: Event) => void,
    clickSavebutton: (evt: Event) => void
}

class ButtonsProfile extends Block {
    constructor(props: TProps) {
        super({
            changeButtons: ButtonsBlockProfile({
                events: {
                  click: (evt: Event) => props.clickChangeButton(evt)
                }
              }),
              saveButton: Button({
                text: 'Изменить',
                nameButton: 'change_button'
              })
        })
    }

    render() {
        const { type = 'changeBlockButton' } = this.props

        return `${type === 'changeBlockButton' ? '{{{changeButtons}}}' : '{{{saveButton}}}'}`
    }
}

function buttonsProfile(props: TProps) {
    return new ButtonsProfile(props)
}

export default buttonsProfile;
