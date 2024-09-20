import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

// signup
const signUp = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await AuthServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, userWithoutPassword } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    token: accessToken,
    data: {
      userWithoutPassword,
    },
  });
});

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUsersFromDB();

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
    message: 'Users retrieved successfully',
    data: result,
  });
});

// refreshToken
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  signUp,
  loginUser,
  getAllUsers,
  refreshToken,
};
