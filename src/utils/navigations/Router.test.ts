import { expect } from "chai";

import { router } from "./Router";
import Block from "../Block/Block";
import sinon from "sinon";

describe("Router", () => {
  let ComponentClass: typeof Block;
  beforeEach(() => {
    class Component extends Block {
      render() {
        return `<div>TEST<div>`;
      }
    }

    ComponentClass = Component;
  });

  it("should call the use method", () => {
    const routerUse = sinon.spy(router, "use");

    router.use("path", ComponentClass);

    expect(routerUse.calledOnce).to.equal(true);
  });

  it("should call the go method", () => {
    router.go("/path");

    expect(window.location.pathname).to.equal("/path");
  });

  it("should call the back method", () => {
    const windowBack = sinon.spy(window.history, "back");

    router.back();

    expect(windowBack.calledOnce).to.equal(true);
  });
});
