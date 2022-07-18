export interface User {
  id: string; 
  name: string;
  username: string;
  password: string;
  collection?: Collection[];
}

export interface Collection {
  id: string; 
  name: string;
  cards: string[];
}
