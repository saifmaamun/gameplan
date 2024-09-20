import AppError from '../../errors/AppError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { TBooking, TTimeSlot } from './booking.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { Types } from 'mongoose';
import { Booking } from './booking.model';
import { startOfDay, endOfDay } from 'date-fns';
import {
  convertTimeToHours,
  findAvailableSlots,
  generateTotalTimeSlots,
  // getAvailableTimeSlots,
} from './booking.utils';

// create a new booking
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

// get all the bookings by admin
const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ isBooked: { $ne: 'canceled' } })
    .populate('user')
    .populate('facility');
  return result;
};

// get user's own booking
const getAllBookingsByUser = async (token: string) => {
  // decoding to get the user info
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(decoded.email);
  const result = await Booking.find({
    user: { $eq: (user as TUser & { _id: Types.ObjectId })._id },
    isBooked: { $ne: 'canceled' },
  }).populate('facility');

  return result;
};

//cancel booking by user
const deleteBookingByUser = async (id: string, token: string) => {
  // decoding to get the user info
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

// check booking time avaibility

const checkAvailableSlots = async (
  date: string,
  facilityId: string,
): Promise<TTimeSlot[]> => {
  // Validate facility existence
  const facility = await Facility.findById(facilityId).exec();
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  // Define the start and end of the day
  const queryDate = new Date(date);
  const startOfDayDate = startOfDay(queryDate);
  const endOfDayDate = endOfDay(queryDate);

  // Retrieve existing bookings for the given date and facility
  const bookings = await Booking.find({
    date: { $gte: startOfDayDate, $lt: endOfDayDate },
    facility: new Types.ObjectId(facilityId),
  }).exec();

  // Filter out the slots that are already booked
  const timeSlots: TTimeSlot[] = generateTotalTimeSlots();
  const availableSlots = findAvailableSlots(timeSlots, bookings);

  return availableSlots;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsByUser,
  deleteBookingByUser,
  checkAvailableSlots,
};
