import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/responseData';
import { IDepartment } from './department.interfaces';
import httpStatus from 'http-status';
import { departmentServices } from './department.services';
import pick from '../../../shared/pick';
import { departmentFilterableFields } from './department.constant';
import { paginationFields } from '../../../constants/pagination';

const createDepartmentToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await departmentServices.createDepartment(departmentData);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getDepartmentsFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, departmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await departmentServices.getDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartmentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await departmentServices.getSingleDepartment(id);

    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department fetched successfully',
      data: result,
    });
  }
);

const updateDepartmentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await departmentServices.updateDepartment(id, updatedData);

    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
);

const deleteSingleDepartmentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await departmentServices.deleteDepartment(id);

    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  }
);

export const DepartmentController = {
  createDepartmentToDB,
  getDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentFromDB,
  deleteSingleDepartmentFromDB,
};
