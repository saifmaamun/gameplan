import AppError from '../../errors/AppError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { Types } from 'mongoose';
import { Booking } from './booking.model';

const createBookingIntoDB = async (token: string, booking: TBooking) => {
  const facility = await Facility.findByIdAndUpdate(booking.facility);
  if (!facility) {
    throw new AppError(400, 'Facility not found');
  }
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(decoded.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  booking.user = (user as TUser & { _id: Types.ObjectId })._id;
  booking.isBooked = 'confirmed';

  const result = await Booking.create(booking);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find();
  return result;
};

const getAllBookingsByUser = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(decoded.email);
  const result = await Booking.find({
    user: { $eq: (user as TUser & { _id: Types.ObjectId })._id },
    isBooked: { $ne: 'canceled' },
  });

  return result;
};

const deleteBookingByUser = async (id: string, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const booking = await Booking.findById(id);
  const user = await User.findById(booking?.user);
  if (decoded.email === user?.email) {
    const result = await Booking.findByIdAndUpdate(
      id,
      { isBooked: 'canceled' },
      { new: true },
    );
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'You Did Not Book That!');
  }
};
export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsByUser,
  deleteBookingByUser,
};
