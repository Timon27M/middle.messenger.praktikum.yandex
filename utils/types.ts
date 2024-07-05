export interface IChatCard {
    image: string;
    firstName: string;
    lastMessage: string;
    owner: boolean;
    time: string;
  }

 export type CSSModuleClasses = { readonly [key: string]: string }