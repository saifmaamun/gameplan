import AppError from '../../errors/AppError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import { TBooking, TTimeSlot } from './booking.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { Types } from 'mongoose';
import { Booking } from './booking.model';
import { convertTimeToHours, getAvailableTimeSlots } from './booking.utils';

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
  booking.payableAmount =
    (convertTimeToHours(booking.endTime) -
      convertTimeToHours(booking.startTime)) *
    facility.pricePerHour;
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

// //////////////////////////////////////////////////////////////////
const checkAvailableSlots = async (date: Date): Promise<TTimeSlot[]> => {
  // Normalize the date to ignore time part
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  // Retrieve bookings for the specified date
  const bookings = await Booking.find({
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  }).sort({ startTime: 1 });

  // Extract booked time slots
  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  // Define facility working hours
  const openingTime = '08:00';
  const closingTime = '22:00';

  // Calculate available time slots
  const result = getAvailableTimeSlots(bookedSlots, openingTime, closingTime);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Available slot!');
  }
  return result;
};
// //////////////////////////////////////////////////////////////////
export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsByUser,
  deleteBookingByUser,
  checkAvailableSlots,
};
