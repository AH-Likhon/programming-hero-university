"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semestersFilterableFields = exports.semestersSearchableFileds = exports.semesterTitleCodeMapper = exports.semesterMonths = exports.semesterCodes = exports.semesterTitles = void 0;
exports.semesterTitles = ['Autumn', 'Summer', 'Fall'];
exports.semesterCodes = ['01', '02', '03'];
exports.semesterMonths = [
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
exports.semesterTitleCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.semestersSearchableFileds = ['title', 'code', 'year'];
exports.semestersFilterableFields = [
    'searchTerm',
    'title',
    'code',
    'year',
];
