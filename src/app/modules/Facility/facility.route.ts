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

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

router.get('/', FacilityControllers.getAllFaculties);

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

export const FacilityRoutes = router;
