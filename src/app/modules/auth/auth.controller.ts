/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUserToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  console.log('Refresh Token::', refreshToken);

  // set refresh cookies

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User successfully logged in!',
    data: others,
  });
});

const refreshTokenToDB = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = await req.cookies.refreshToken;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User successfully logged in!',
    data: result,
  });
});

export const AuthController = {
  loginUserToDB,
  refreshTokenToDB,
};
