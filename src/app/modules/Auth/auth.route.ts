import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// singup
router.post(
  '/signup',
  validateRequest(AuthValidation.signinValidationSchema),
  AuthControllers.signUp,
);

// login
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// get all users by admin
router.get('/users', auth(USER_ROLE.admin), AuthControllers.getAllUsers);

export const AuthRoutes = router;
