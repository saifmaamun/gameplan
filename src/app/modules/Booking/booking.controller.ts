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
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  //   deleteFacility,
};
