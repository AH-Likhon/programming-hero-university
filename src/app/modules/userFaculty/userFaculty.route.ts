import express from 'express';
import { UserFacultyController } from './userFaculty.controller';
import validateRequest from '../../middlewares/validateReq';
import { UserFacultyValidation } from './userFaculty.validation';

const router = express.Router();

router.get('/:id', UserFacultyController.getSingleUserFacultyFromDB);

router.patch(
  '/:id',
  validateRequest(UserFacultyValidation.updateUserFacultyZodSchema),
  UserFacultyController.updateUserFacultyToDB
);

router.delete('/:id', UserFacultyController.deleteUserFacultyFromDB);
router.get('/', UserFacultyController.getAllUserFacultiesFromDB);

export const FacultyRoutes = router;
