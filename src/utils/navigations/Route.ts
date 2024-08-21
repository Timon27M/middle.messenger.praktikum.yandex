import Block from "../Block/Block";

type rootId = {
  rootId: string;
};

export default class Route {
  private pathname: string;

  private BlockClass: typeof Block;

  private props: rootId & Record<string, any>;

  private block: Block | null;

  constructor(
    pathname: string,
    view: typeof Block,
    props: rootId & Record<string, any>
  ) {
    this.pathname = pathname;
    this.BlockClass = view;
    this.props = props;
    this.block = null;
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  private pageRender(block: Block, rootId: string) {
    const root = document.querySelector(rootId);

    if (root) {
      root.innerHTML = "";
      root.append(block.getContent());
    } else {
      throw new Error("root не найден");
    }
  }

  public render(props?: Record<string, any>) {
    if (!this.block) {
      this.block = new this.BlockClass(props);
      this.pageRender(this.block, this.props.rootId);
    }
    if (this.block && this.props.rootId) {
      // console.log(props);
      // this.block = new this.BlockClass(props);
      this.block.setProps(props);
      this.pageRender(this.block, this.props.rootId);
    }
  }
}
