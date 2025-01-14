import { ObjectId } from 'mongoose';

export interface IOrder {
  _id?: ObjectId;
  user: ObjectId;
  truck: ObjectId;
  status: 'created' | 'in transit' | 'completed';
  pickup: ObjectId;
  dropoff: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}