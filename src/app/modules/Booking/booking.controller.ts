import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

// create Booking
const createBooking = catchAsync(async (req, res) => {
  //
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

// see all Booking Admin
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  // if no data found
  if (result.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

//  see all booking by  user's own
const getUserBookings = catchAsync(async (req, res) => {
  const { authorization } = req.headers;
  const result = await BookingServices.getAllBookingsByUser(
    authorization as string,
  );

  // if no data found
  if (result.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

// cancel user's own booking
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

// check availability for booking
const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;
  const queryDate = date ? new Date(date as string) : new Date();

  const result = await BookingServices.checkAvailableSlots(queryDate);

  // if no data found
  if (result.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Available Slot Found',
      data: [],
    });
  }

  res.json({
    success: true,
    statusCode: 200,
    message: 'Availability checked successfully.',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
  checkAvailability,
};
