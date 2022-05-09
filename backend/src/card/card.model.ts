import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export type CardType = 'CURSED' | 'CRYSTAL' | 'SUN' | 'MOON' | 'BW';
export type Suit = 'HAT' | 'EVIL' | 'HPAIR' | 'SPAIR' | 'HAPPY' | 'SAD';
export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Modifier = 'SUN' | 'MOON' | 'NONE';

export const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['CURSED', 'CRYSTAL', 'SUN', 'MOON', 'BW'],
    required: true,
  },
  suit: {
    type: String,
    enum: ['HAT', 'EVIL', 'HPAIR', 'SPAIR', 'HAPPY', 'SAD'],
    required: true,
  },
  value: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
  },
  modifier: {
    type: String,
    enum: ['SUN', 'MOON', 'NONE'],
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export interface ICard {
  id: string;
  name: string;
  type: CardType;
  suit: Suit;
  value: Value;
  modifier: Modifier;
  creator: Schema.Types.ObjectId;
}
