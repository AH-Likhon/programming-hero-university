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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const semester_constant_1 = require("./semester.constant");
const semester_model_1 = require("./semester.model");
const http_status_1 = __importDefault(require("http-status"));
const createSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (semester_constant_1.semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semester Code');
    }
    const result = yield semester_model_1.AcademicSemester.create(payload);
    return result;
});
const getAllSemesters = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    // console.log(Object.keys(filtersData));
    // console.log(filtersData);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: semester_constant_1.semestersSearchableFileds.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePaginations(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield semester_model_1.AcademicSemester.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield semester_model_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_model_1.AcademicSemester.findById(id);
    return result;
});
const updatedSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.title &&
        payload.code &&
        semester_constant_1.semesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semester Code');
    }
    const result = yield semester_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_model_1.AcademicSemester.findByIdAndDelete(id);
    return result;
});
exports.SemesterService = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updatedSemester,
    deleteSemester,
};
