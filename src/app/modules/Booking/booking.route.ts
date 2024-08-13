import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';
import { createBookingValidationSchema } from './booking.validations';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.delete('/:id', auth(USER_ROLE.user), BookingControllers.deleteBooking);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get('/user', auth(USER_ROLE.user), BookingControllers.getUserBookings);

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
