import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const { authorization } = req.headers;
  const bookingData = req.body;

  const result = await BookingServices.createBookingIntoDB(
    authorization as string,
    bookingData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const { authorization } = req.headers;
  const result = await BookingServices.getAllBookingsByUser(
    authorization as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const result = await BookingServices.deleteBookingByUser(
    id,
    authorization as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings cancelled successfully',
    data: result,
  });
});

// //////////////////////////////////////////////////////////////////
const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;
  const queryDate = date ? new Date(date as string) : new Date();

  const result = await BookingServices.checkAvailableSlots(queryDate);

  res.json({
    success: true,
    statusCode: 200,
    message: 'Availability checked successfully.',
    data: result,
  });
});
// //////////////////////////////////////////////////////////////////

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
  checkAvailability,
};
