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
exports.SemesterController = void 0;
const semester_service_1 = require("./semester.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const responseData_1 = __importDefault(require("../../../shared/responseData"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const semester_constant_1 = require("./semester.constant");
const createSemesterToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterData = __rest(req.body, []);
    const result = yield semester_service_1.SemesterService.createSemester(semesterData);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result,
    });
    // next();
}));
const getAllSemestersFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, semester_constant_1.semestersFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    // console.log(filters);
    const result = yield semester_service_1.SemesterService.getAllSemesters(filters, paginationOptions);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters successfully retrieved',
        meta: result.meta,
        data: result.data,
    });
    // next();
}));
const getSingleSemesterFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield semester_service_1.SemesterService.getSingleSemester(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester retrieved successfully',
        data: result,
    });
    // next();
}));
const updatedSemesterFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield semester_service_1.SemesterService.updatedSemester(id, updatedData);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester updated successfully',
        data: result,
    });
    // next();
}));
const deleteSemesterFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield semester_service_1.SemesterService.deleteSemester(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester deleted successfully',
        data: result,
    });
}));
exports.SemesterController = {
    createSemesterToDB,
    getAllSemestersFromDB,
    getSingleSemesterFromDB,
    updatedSemesterFromDB,
    deleteSemesterFromDB,
};
