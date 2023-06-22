import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interfaces';

const FacultyShema = new Schema<IFaculty, FacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IFaculty, FacultyModel>(
  'AcademicFaculty',
  FacultyShema
);
