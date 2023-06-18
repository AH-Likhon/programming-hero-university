import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interfaces';

export type IDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IFaculty;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;

export type IDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
