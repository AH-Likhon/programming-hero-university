import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPagination } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import {
  semesterTitleCodeMapper,
  semestersSearchableFileds,
} from './semester.constant';
import { IAcSemester, ISemesterFilters } from './semester.interface';
import { AcademicSemester } from './semester.model';
import httpStatus from 'http-status';

const createSemester = async (payload: IAcSemester): Promise<IAcSemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: ISemesterFilters,
  paginationOptions: IPagination
): Promise<IGenericPagination<IAcSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // console.log(Object.keys(filtersData));
  // console.log(filtersData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: semestersSearchableFileds.map(field => ({
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
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (id: string): Promise<IAcSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updatedSemester = async (
  id: string,
  payload: Partial<IAcSemester>
): Promise<IAcSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    semesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemester = async (id: string): Promise<IAcSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const SemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updatedSemester,
  deleteSemester,
};
