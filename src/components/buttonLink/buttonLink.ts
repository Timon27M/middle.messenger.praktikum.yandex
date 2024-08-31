import Block from "../../utils/Block/Block";

type TProps = {
  class: string;
  text: string;
  events: {
    click: (evt: Event) => void;
  };
};

class ButtonLink extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      class: props.class,
      text: props.text,
    });
  }

  render() {
    return `
    <button class={{class}} type="button">{{text}}</button>
    `;
  }
}

function buttonLink(props: TProps) {
  return new ButtonLink(props);
}

export default buttonLink;
