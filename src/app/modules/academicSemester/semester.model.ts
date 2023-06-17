import { Schema, model } from 'mongoose';
import { IAcSemester } from './semester.interface';
import {
  semesterCodes,
  semesterMonths,
  semesterTitles,
} from './semester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const acSemesterSchema = new Schema<IAcSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

acSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This Academic Semester is already exists!'
    );
  }
  next();
});

export const AcademicSemester = model<IAcSemester>(
  'AcademicSemester',
  acSemesterSchema
);
