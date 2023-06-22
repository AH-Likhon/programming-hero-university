import { Model } from 'mongoose';

export type ISemesterMonths =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

export type ISemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type ISemesterCodes = '01' | '02' | '03';

export type IAcSemester = {
  title: ISemesterTitles;
  year: string;
  code: ISemesterCodes;
  startMonth: ISemesterMonths;
  endMonth: ISemesterMonths;
};

export type ISemesterFilters = {
  searchTerm?: string;
};

export type AcSemesterModel = Model<IAcSemester>;
