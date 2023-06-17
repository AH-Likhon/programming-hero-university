import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createUserToDB = catchAsync(async (req: Request, res: Response) => {
  const { user } = await req.body;
  const result = await UserService.createUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });

  // next();
});

export const UserController = {
  createUserToDB,
};
