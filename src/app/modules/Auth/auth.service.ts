import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  const userWithoutPassword = await User.findOne({ email: user.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password');

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
  refreshToken,
};
