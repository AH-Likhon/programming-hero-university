import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import { IFaculty } from './faculty.interface';
import { FacultyServices } from './faculty.service';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/pagination';

const createFacultyToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await FacultyServices.createFaculty(facultyData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getFacultiesFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyServices.getFaculties(filters, paginationOptions);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFacultyFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty fetched successfully',
      data: result,
    });
  }
);

const updateFacultyFromDB = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await FacultyServices.updateFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  })
);

const deleteFacultyFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  createFacultyToDB,
  getFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyFromDB,
};
