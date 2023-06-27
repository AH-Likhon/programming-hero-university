import express from 'express';
import validateRequest from '../../middlewares/validateReq';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academicFaculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFacultyToDB
);

router.get('/:id', AcademicFacultyController.getSingleFacultyFromDB);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFacultyFromDB
);

router.delete('/:id', AcademicFacultyController.deleteFacultyFromDB);

router.get('/', AcademicFacultyController.getFacultiesFromDB);

export const AcademicFacultyRoutes = router;
