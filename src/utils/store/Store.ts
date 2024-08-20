import Block from "../Block/Block";
import EventBus from "../EventBus/EventBus";
import { isEqual } from "../functions/isEqual";
import set from "../functions/set";

type Indexed<T = unknown> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = "updated",
}

export type TUserStore = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type TMessageStore = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type TLastMessage = {
  time: string;
  content: string;
  id: number;
  user: TUserStore;
};

export type TChatStore = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message?: TLastMessage;
};

export type RootStore = {
  currentUser?: TUserStore;
  chatList?: TChatStore[];
  messageList?: TMessageStore[];
  currentChatId?: string;
  searchValue?: string;
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState(): RootStore {
    return this.state;
  }

  public set(path: keyof RootStore, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();

export const connect = (mapStateToProps: (state: RootStore) => Indexed) => {
  return (Component: typeof Block): typeof Block => {
     return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState() as RootStore);

        super({ ...props, ...state });
//store
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
        //   if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
        //   }

          state = newState;
        });
      }
    };
  };
};
