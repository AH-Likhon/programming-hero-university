import express from 'express';
import validateRequest from '../../middlewares/validateReq';
import { SemesterValidation } from './semester.validation';
import { SemesterController } from './semester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterController.createSemesterToDB
);

router.get('/:id', SemesterController.getSingleSemesterFromDB);
router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  SemesterController.updatedSemesterFromDB
);
router.delete('/:id', SemesterController.deleteSemesterFromDB);
router.get('/', SemesterController.getAllSemestersFromDB);

export const SemesterRoutes = router;
