import { Request, Response } from 'express';
import { SemesterService } from './semester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import { IAcSemester } from './semester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { semestersFilterableFields } from './semester.constant';

const createSemesterToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body;
  const result = await SemesterService.createSemester(semesterData);

  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });

  // next();
});

const getAllSemestersFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semestersFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    // console.log(filters);

    const result = await SemesterService.getAllSemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters successfully retrieved',
      meta: result.meta,
      data: result.data,
    });

    // next();
  }
);

const getSingleSemesterFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await SemesterService.getSingleSemester(id);

    sendResponse<IAcSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      data: result,
    });
    // next();
  }
);

const updatedSemesterFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await SemesterService.updatedSemester(id, updatedData);

    sendResponse<IAcSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully',
      data: result,
    });

    // next();
  }
);

const deleteSemesterFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SemesterService.deleteSemester(id);

  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const SemesterController = {
  createSemesterToDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updatedSemesterFromDB,
  deleteSemesterFromDB,
};
