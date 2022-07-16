export interface User {
  name: string;
  username: string;
  password: string;
  collection?: Collection[];
}

export interface Collection {
  name: string;
  cards: string[];
}
