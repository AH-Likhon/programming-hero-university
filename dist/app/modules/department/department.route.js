"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateReq_1 = __importDefault(require("../../middlewares/validateReq"));
const department_validation_1 = require("./department.validation");
const department_controller_1 = require("./department.controller");
const router = express_1.default.Router();
router.post('/create-department', (0, validateReq_1.default)(department_validation_1.AcademicDepartmentValidation.createDepartmentZodSchema), department_controller_1.DepartmentController.createDepartmentToDB);
router.get('/:id', department_controller_1.DepartmentController.getSingleDepartmentFromDB);
router.patch('/:id', (0, validateReq_1.default)(department_validation_1.AcademicDepartmentValidation.updateDepartmentZodSchema), department_controller_1.DepartmentController.updateDepartmentFromDB);
router.delete('/:id', department_controller_1.DepartmentController.deleteSingleDepartmentFromDB);
router.get('/', department_controller_1.DepartmentController.getDepartmentsFromDB);
exports.DepartmentRoutes = router;
