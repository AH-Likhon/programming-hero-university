import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/semester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { DepartmentRoutes } from '../modules/department/department.route';

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
