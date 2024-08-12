import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './booking.controller';

const router = express.Router();

// router.delete(
//   '/:id',
//   auth(USER_ROLE.admin),
//   FacilityControllers.deleteFacility,
// );

// router.patch(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(updateFacilityValidationSchema),
//   FacilityControllers.updateFacility,
// );

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllFaculties);

router.post(
  '/',
  auth(USER_ROLE.user),
  //   validateRequest(createFacilityValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
