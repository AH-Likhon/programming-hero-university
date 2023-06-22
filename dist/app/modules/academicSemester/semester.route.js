"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateReq_1 = __importDefault(require("../../middlewares/validateReq"));
const semester_validation_1 = require("./semester.validation");
const semester_controller_1 = require("./semester.controller");
const router = express_1.default.Router();
router.post('/create-semester', (0, validateReq_1.default)(semester_validation_1.SemesterValidation.createSemesterZodSchema), semester_controller_1.SemesterController.createSemesterToDB);
router.get('/:id', semester_controller_1.SemesterController.getSingleSemesterFromDB);
router.patch('/:id', (0, validateReq_1.default)(semester_validation_1.SemesterValidation.updateSemesterZodSchema), semester_controller_1.SemesterController.updatedSemesterFromDB);
router.delete('/:id', semester_controller_1.SemesterController.deleteSemesterFromDB);
router.get('/', semester_controller_1.SemesterController.getAllSemestersFromDB);
exports.SemesterRoutes = router;
