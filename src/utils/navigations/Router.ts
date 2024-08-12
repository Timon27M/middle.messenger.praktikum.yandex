import Block from "../Block/Block";
import Route from "./Route";

export default class Router {
  public routes: Route[] = [];

  public currentRoute: Route | null = null;

  public rootId: string = "#app";

  public history: History | undefined = window.history;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootId: this.rootId });

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = () => {
      this.onRoute(document.location.pathname);
    };

    if (this.history) {
      this.onRoute(window.location.pathname);
    }
  }

  private onRoute(pathname: string, props?: Record<string, any>) {
    const route = this.getRoute(pathname);
    console.log(route);
    if (!route) {
      return;
    }

    route.render(props);
  }

  public go(pathname: string, props?: Record<string, any>) {
    this.history?.pushState({}, "", pathname);
    this.onRoute(pathname, props);
  }

  public forward() {
    this.history?.go();
  }

  public back() {
    this.history?.back();
    console.log(this.history?.back());
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router();
