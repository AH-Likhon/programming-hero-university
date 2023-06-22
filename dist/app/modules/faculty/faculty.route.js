"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateReq_1 = __importDefault(require("../../middlewares/validateReq"));
const faculty_validation_1 = require("./faculty.validation");
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateReq_1.default)(faculty_validation_1.AcademicFacultyValidation.createFacultyZodSchema), faculty_controller_1.FacultyController.createFacultyToDB);
router.get('/:id', faculty_controller_1.FacultyController.getSingleFacultyFromDB);
router.patch('/:id', (0, validateReq_1.default)(faculty_validation_1.AcademicFacultyValidation.updatefacultyZodSchema), faculty_controller_1.FacultyController.updateFacultyFromDB);
router.delete('/:id', faculty_controller_1.FacultyController.deleteFacultyFromDB);
router.get('/', faculty_controller_1.FacultyController.getFacultiesFromDB);
exports.FacultyRoutes = router;
