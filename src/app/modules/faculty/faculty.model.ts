import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

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

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultyShema);
