import { EventBus } from "../EventBus/EventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

type TBlockProps = Record<string, any>;

export abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;

  public props: TBlockProps;
  public id = nanoid();

  protected eventBus: () => EventBus;
  public  children: Record<string, any>;
  protected abstract render(): string;

  constructor(propsAndChildren: Record<string, any> = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Record<string, any>) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement();
  }

  _createDocumentElement() {
    return document.createElement("template") as HTMLTemplateElement;
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  setProps(newProps: object = {}) {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  }

  get element() {
    return this._element;
  }

  getContent(): HTMLElement {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: TBlockProps) {
    const self = this;

    return new Proxy(props, {
      get(target: TBlockProps, prop: string & keyof TBlockProps) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: TBlockProps, prop: string & keyof TBlockProps, value: any) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element !== null) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element !== null) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _render() {
    const template = this.render();

    const propsAndStubs = this._getPropsAndStubs(this.props);

    const fragment = this.compile(template, propsAndStubs);

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  _getPropsAndStubs(props: Record<string, any>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    return propsAndStubs;
  }

  compile(template: string, props: any): DocumentFragment {
    const htmlElement = Handlebars.compile(template)(props);

    const fragment = this._createDocumentElement();

    fragment.innerHTML = htmlElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  show() {
    if (this.getContent() !== undefined) {
      this.getContent().style.display = "block";
    }
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
