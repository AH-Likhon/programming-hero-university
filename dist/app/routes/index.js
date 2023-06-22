"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const semester_route_1 = require("../modules/academicSemester/semester.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const department_route_1 = require("../modules/department/department.route");
const student_route_1 = require("../modules/student/student.route");
const routes = express_1.default.Router();
const collectionOfRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/semesters',
        route: semester_route_1.SemesterRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/departments',
        route: department_route_1.DepartmentRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
];
collectionOfRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
