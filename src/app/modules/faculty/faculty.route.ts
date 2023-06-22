import express from 'express';
import validateRequest from '../../middlewares/validateReq';
import { AcademicFacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  FacultyController.createFacultyToDB
);

router.get('/:id', FacultyController.getSingleFacultyFromDB);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  FacultyController.updateFacultyFromDB
);

router.delete('/:id', FacultyController.deleteFacultyFromDB);

router.get('/', FacultyController.getFacultiesFromDB);

export const FacultyRoutes = router;
