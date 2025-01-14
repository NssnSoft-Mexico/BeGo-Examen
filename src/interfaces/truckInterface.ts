import { ObjectId } from 'mongoose';

export interface ITruck {
  _id?: ObjectId;
  user: ObjectId;
  year: string;
  color: string;
  plates: string;
  createdAt?: Date;
  updatedAt?: Date;
}