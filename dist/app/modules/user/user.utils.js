"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
const generateStudentId = (semester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${semester === null || semester === void 0 ? void 0 : semester.year.substring(2)}${semester === null || semester === void 0 ? void 0 : semester.code}${incrementedId}`;
    return incrementedId;
    //   lastUserId++
    //   return String(lastUserId).padStart(5, '0')
});
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({
        createdAT: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0');
    let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    increamentedId = `F-${increamentedId}`;
    return increamentedId;
});
exports.generateFacultyId = generateFacultyId;
