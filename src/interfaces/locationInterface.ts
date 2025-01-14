import { ObjectId } from 'mongoose';

export interface ILocation {
    _id?: ObjectId;
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;
    user: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}