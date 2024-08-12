import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const { authorization } = req.headers;
  const bookingData = req.body;

  const result = await BookingServices.createBookingIntoDB(
    authorization,
    bookingData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  //   getAllFaculties,
  //   updateFacility,
  //   deleteFacility,
};
