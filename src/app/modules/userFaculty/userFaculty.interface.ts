import { Model, Types } from 'mongoose';
import { IDepartment } from '../department/department.interfaces';
import { IFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IUserFaculty = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicDepartment: Types.ObjectId | IDepartment;
  academicFaculty: Types.ObjectId | IFaculty;
  designation: string;
};

export type UserFacultyModel = Model<IUserFaculty, Record<string, unknown>>;

export type IUserFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};
