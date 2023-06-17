import {
  ISemesterCodes,
  ISemesterMonths,
  ISemesterTitles,
} from './semester.interface';

export const semesterTitles: ISemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCodes: ISemesterCodes[] = ['01', '02', '03'];

export const semesterMonths: ISemesterMonths[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const semesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semestersSearchableFileds = ['title', 'code', 'year'];

export const semestersFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
