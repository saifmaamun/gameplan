import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
    required: true,
  },
});

// userSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });
// BookingSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const booking = this;

//   console.log(booking);

//   next();
// });

export const Booking = model<TBooking>('Booking', BookingSchema);
