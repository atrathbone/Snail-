import { Card } from "./card.model";

export interface User {
  id: string; 
  name: string;
  username: string;
  password: string;
  collection?: Collection[];
}

export interface UserCollectionsPopulated {
  id: string; 
  name: string;
  username: string;
  password: string;
  collection?: PopulatedCollection[];
}

export interface Collection {
  id: string; 
  name: string;
  cards: string[];
}

export interface PopulatedCollection {
  id: string; 
  name: string;
  cards: Card[];
}