import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPagination } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { departmentSearchableFields } from './department.constant';
import { IDepartment, IDepartmentFilters } from './department.interfaces';
import { Department } from './department.model';

const createDepartment = async (
  payload: IDepartment
): Promise<IDepartment | null> => {
  const result = (await Department.create(payload)).populate('academicFaculty');
  return result;
};

const getDepartments = async (
  filters: IDepartmentFilters,
  paginationOptions: IPagination
): Promise<IGenericPagination<IDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: departmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Department.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Department.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id).populate('academicFaculty');
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id);
  return result;
};

export const departmentServices = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
