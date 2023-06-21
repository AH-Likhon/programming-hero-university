import express from 'express';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateReq';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudentFromDB); // get single
router.get('/', StudentController.getAllStudentsFromDB); // get all
router.delete('/:id', StudentController.deleteStudentFromDB); // delete
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updatedStudentFromDB
);

export const StudentRoutes = router;
