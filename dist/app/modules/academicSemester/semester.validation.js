"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterValidation = void 0;
const zod_1 = require("zod");
const semester_constant_1 = require("./semester.constant");
const createSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...semester_constant_1.semesterTitles], {
            required_error: 'Title is required',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required',
        }),
        code: zod_1.z.enum([...semester_constant_1.semesterCodes]),
        startMonth: zod_1.z.enum([...semester_constant_1.semesterMonths], {
            required_error: 'Start month is required',
        }),
        endMonth: zod_1.z.enum([...semester_constant_1.semesterMonths], {
            required_error: 'End month is required',
        }),
    }),
});
const updateSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...semester_constant_1.semesterTitles], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required',
        })
            .optional(),
        code: zod_1.z.enum([...semester_constant_1.semesterCodes]).optional(),
        startMonth: zod_1.z
            .enum([...semester_constant_1.semesterMonths], {
            required_error: 'Start month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...semester_constant_1.semesterMonths], {
            required_error: 'End month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either title and code should be provided or neither',
});
exports.SemesterValidation = {
    createSemesterZodSchema,
    updateSemesterZodSchema,
};
