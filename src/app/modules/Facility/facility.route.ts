import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { FacilityControllers } from './facility.controller';
import {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
} from './facility.validations';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// get single facility
router.get(
  '/:id',

  FacilityControllers.getSingleFacility,
);
// delete facility
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

// update facility
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

// get all facility
router.get('/', FacilityControllers.getAllFaculties);

// create facility
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

export const FacilityRoutes = router;
