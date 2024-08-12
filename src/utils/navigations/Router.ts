import Block from "../Block/Block";
import Route from "./Route";

export default class Router {
  public routes: Route[] | undefined;

  public currentRoute: Route | null = null;

  public _instance: any;

  public history: History | undefined;

  constructor() {
    if (this._instance) {
      return this._instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;

    this._instance = this;
  }
}
