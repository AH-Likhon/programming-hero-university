import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getAllStudentsFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // console.log(filters);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students successfully retrieved',
    meta: result.meta,
    data: result.data,
  });

  // next();
});

const getSingleStudentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await StudentService.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
    // next();
  }
);

const updatedStudentFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updatedStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });

  // next();
});

const deleteStudentFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updatedStudentFromDB,
  deleteStudentFromDB,
};
