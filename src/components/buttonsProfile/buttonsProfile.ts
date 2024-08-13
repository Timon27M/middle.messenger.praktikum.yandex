import Block from "../../utils/Block/Block";
import Button from "../button/button";
import ButtonsBlockProfile from "../buttonsChangeProfile/buttonsChangeProfile";

type TProps = {
  type?: string;
  clickButtonChangeData: (evt: Event) => void;
  clickButtonChangePassword: (evt: Event) => void;
  clickButtonLogout: (evt: Event) => void;
  clickSavebutton: (evt: Event) => void;
};

class ButtonsProfile extends Block {
  constructor(props: TProps) {
    super({
      changeButtons: ButtonsBlockProfile({
        clickButtonChangeData: props.clickButtonChangeData,
        clickButtonChangePassword: props.clickButtonChangePassword,
        clickButtonLogout: props.clickButtonLogout,
      }),
      saveButton: Button({
        text: "Изменить",
        nameButton: "change_button",
      }),
    });
  }

  render() {
    const { type = "changeBlockButton" } = this.props;

    return `${
      type === "changeBlockButton" ? "{{{changeButtons}}}" : "{{{saveButton}}}"
    }`;
  }
}

function buttonsProfile(props: TProps) {
  return new ButtonsProfile(props);
}

export default buttonsProfile;
