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
exports.DepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const responseData_1 = __importDefault(require("../../../shared/responseData"));
const http_status_1 = __importDefault(require("http-status"));
const department_services_1 = require("./department.services");
const pick_1 = __importDefault(require("../../../shared/pick"));
const department_constant_1 = require("./department.constant");
const pagination_1 = require("../../../constants/pagination");
const createDepartmentToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentData = __rest(req.body, []);
    const result = yield department_services_1.departmentServices.createDepartment(departmentData);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result,
    });
}));
const getDepartmentsFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, department_constant_1.departmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield department_services_1.departmentServices.getDepartments(filters, paginationOptions);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic departments fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleDepartmentFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield department_services_1.departmentServices.getSingleDepartment(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Department fetched successfully',
        data: result,
    });
}));
const updateDepartmentFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield department_services_1.departmentServices.updateDepartment(id, updatedData);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Department updated successfully',
        data: result,
    });
}));
const deleteSingleDepartmentFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield department_services_1.departmentServices.deleteDepartment(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Department deleted successfully',
        data: result,
    });
}));
exports.DepartmentController = {
    createDepartmentToDB,
    getDepartmentsFromDB,
    getSingleDepartmentFromDB,
    updateDepartmentFromDB,
    deleteSingleDepartmentFromDB,
};
