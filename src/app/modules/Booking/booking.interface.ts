import { Date, Types } from 'mongoose';

export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount?: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}
export interface TTimeSlot {
  startTime: string;
  endTime: string;
}
