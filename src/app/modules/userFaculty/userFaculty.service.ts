/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IUserFaculty, IUserFacultyFilters } from './userFaculty.interface';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericPagination } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { facultyUserSearchableFields } from './userFaculty.constant';
import { UserFaculty } from './userFaculty.model';

const getAllUserFaculties = async (
  filters: IUserFacultyFilters,
  paginationOptions: IPagination
): Promise<IGenericPagination<IUserFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultyUserSearchableFields.map(field => ({
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

  const result = await UserFaculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await UserFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUserFaculty = async (
  id: string
): Promise<IUserFaculty | null> => {
  const result = await UserFaculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const updateUserFaculty = async (
  id: string,
  payload: Partial<IUserFaculty>
): Promise<IUserFaculty | null> => {
  const isExist = await UserFaculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Faculty not found !');
  }

  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IUserFaculty> = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUserFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await UserFaculty.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    }
  );
  return result;
};

const deleteUserFaculty = async (id: string): Promise<IUserFaculty | null> => {
  // check if the faculty is exist
  const isExist = await UserFaculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await UserFaculty.findOneAndDelete(
      { _id: isExist._id },
      { session }
    );
    if (!faculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    return faculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserFacultyService = {
  getAllUserFaculties,
  getSingleUserFaculty,
  updateUserFaculty,
  deleteUserFaculty,
};
