import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/semester.route';

const routes = express.Router();

const collectionOfRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
