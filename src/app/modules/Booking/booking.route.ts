import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';
import { createBookingValidationSchema } from './booking.validations';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// cancel bookings
router.delete('/:id', auth(USER_ROLE.user), BookingControllers.deleteBooking);

// get all bookings by admin
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

// get booking by user's own
router.get('/user', auth(USER_ROLE.user), BookingControllers.getUserBookings);

// create booking
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
