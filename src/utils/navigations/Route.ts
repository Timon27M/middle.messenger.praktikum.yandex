import Block from "../Block/Block";

export default class Route {
  private pathname: string;

  private blockClass: Block;

  private props: Record<string, any>;

  private block: Block | null;

  constructor(pathname: string, view: Block, props: Record<string, any>) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
    this.block = null;
  }
}
