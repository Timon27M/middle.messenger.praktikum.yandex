import { expect } from "chai";
import Block from "./Block";
import sinon from "sinon";

type TProps = {
  title?: string;
  children?: typeof Block;
  events?: {
    click: () => void;
  };
};

describe("Block", () => {
  let ComponentClass: typeof Block;

  beforeEach(() => {
    class Component extends Block {
      constructor(props: TProps) {
        super(props);
      }

      render() {
        return `
        <div>{{title}}<div>
        `;
      }
    }

    ComponentClass = Component;
  });

  it("should return a prop from the component", () => {
    const component = new ComponentClass({ text: "new Block" });

    const propText = component.props.text;

    expect(propText).to.equal("new Block");
  });

  it("should cause a click on the component", () => {
    const func = sinon.stub();
    const component = new ComponentClass({
      text: "new Block",
      events: {
        click: func,
      },
    });

    const event = new MouseEvent("click");

    component.element?.dispatchEvent(event);

    expect(func.calledOnce).to.equal(true);
  });

  it("should check the children of the component", () => {
    const component = new ComponentClass({
      child: new ComponentClass(),
    });

    expect(component.children).to.deep.equal({
      child: component.children.child,
    });
  });
});
