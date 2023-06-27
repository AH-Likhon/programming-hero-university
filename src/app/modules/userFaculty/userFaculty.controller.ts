import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyUserFilterableFields } from './userFaculty.constant';
import { UserFacultyService } from './userFaculty.service';
import sendResponse from '../../../shared/responseData';
import { IUserFaculty } from './userFaculty.interface';

const getAllUserFacultiesFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyUserFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserFacultyService.getAllUserFaculties(
      filters,
      paginationOptions
    );

    sendResponse<IUserFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User faculties retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUserFacultyFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserFacultyService.getSingleUserFaculty(id);

    sendResponse<IUserFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User faculty retrieved successfully !',
      data: result,
    });
  }
);

const updateUserFacultyToDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await UserFacultyService.updateUserFaculty(id, updatedData);

    sendResponse<IUserFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User faculty updated successfully !',
      data: result,
    });
  }
);

const deleteUserFacultyFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserFacultyService.deleteUserFaculty(id);

    sendResponse<IUserFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User faculty deleted successfully !',
      data: result,
    });
  }
);

export const UserFacultyController = {
  getAllUserFacultiesFromDB,
  getSingleUserFacultyFromDB,
  updateUserFacultyToDB,
  deleteUserFacultyFromDB,
};
