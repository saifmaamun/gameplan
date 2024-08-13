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

// export interface UserModel extends Model<TUser> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(id: string): Promise<TUser>;
//   //instance methods for checking if passwords are matched
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
//   isJWTIssuedBeforePasswordChanged(
//     passwordChangedTimestamp: Date,
//     jwtIssuedTimestamp: number,
//   ): boolean;
// }
export interface TTimeSlot {
  startTime: string;
  endTime: string;
}
