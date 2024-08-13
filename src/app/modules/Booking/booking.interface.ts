import { Date, Types } from 'mongoose';

// interface for booking
export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount?: number;
  isBooked?: 'confirmed' | 'unconfirmed' | 'canceled';
}

// interacce for checking booking time
export interface TTimeSlot {
  startTime: string;
  endTime: string;
}
