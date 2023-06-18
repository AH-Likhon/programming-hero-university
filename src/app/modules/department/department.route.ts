import express from 'express';
import validateRequest from '../../middlewares/validateReq';
import { AcademicDepartmentValidation } from './department.validation';
import { DepartmentController } from './department.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartmentToDB
);

router.get('/:id', DepartmentController.getSingleDepartmentFromDB);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  DepartmentController.updateDepartmentFromDB
);

router.delete('/:id', DepartmentController.deleteSingleDepartmentFromDB);

router.get('/', DepartmentController.getDepartmentsFromDB);

export const DepartmentRoutes = router;
