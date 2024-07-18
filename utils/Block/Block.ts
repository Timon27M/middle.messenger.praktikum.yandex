import { EventBus } from "../EventBus/EventBus";
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
  private _meta: TBlockProps;
  public props: TBlockProps;

  protected eventBus: () => EventBus;
  protected abstract render(): string;

  constructor(props: Record<string, any> = {}) {
    const eventBus = new EventBus();

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
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
    const { props } = this._meta;
    this.componentDidMount(props);
  }

  componentDidMount(oldProps: object = {}) {
    this.setProps(oldProps);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(newProps: TBlockProps) {
    this.componentDidUpdate(newProps);
  }

  componentDidUpdate(newProps: TBlockProps) {
    this.setProps(newProps);
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

    const fragment = this.compile(template, this.props);

    
    this._removeEvents();
    
    const newElement = fragment.firstElementChild as HTMLElement;
    
    
    if (this._element) {
        this._element.replaceWith(newElement);
    }
    
    this._element = newElement;

    this._addEvents();
  }

  compile(template: string, data: any): DocumentFragment {
    const htmlElement = Handlebars.compile(template)(data);

    
    const temp = this._createDocumentElement();
    
    temp.innerHTML = htmlElement;

    return temp.content;
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
