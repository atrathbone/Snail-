import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: {
    type: [String],
    required: true,
  },
});

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collections: {
    type: [CollectionSchema],
    required: false,
    
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export interface ICollection {
  id: string;
  name: string;
  cards: Array<string>;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
