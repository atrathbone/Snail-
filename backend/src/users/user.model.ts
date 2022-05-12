import { Schema } from 'mongoose';
import mongoose from 'mongoose';

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
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
