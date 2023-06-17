import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateReq';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUserToDB
);

export const UserRoutes = router;
