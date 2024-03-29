import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateReq';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudentToDB
);

export const UserRoutes = router;
