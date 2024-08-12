import { Date, Types } from 'mongoose';

export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}

// export interface BookingModel extends Model<TBooking> {
//   //instance methods for checking if the user exist
//   isUserExistsByID(id: string): Promise<TUser>;
//   //instance methods for checking if passwords are matched
// }
