import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudentToDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.cookies, 'Cookies');

  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });

  // next();
});

const createFacultyToDB = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User faculty created successfully!',
    data: result,
  });
});

export const UserController = {
  createStudentToDB,
  createFacultyToDB,
};
