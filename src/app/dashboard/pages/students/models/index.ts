import { Course } from "../../courses/models";

export interface Student {
    id: number;
    name: string;
    lastName: string;
    email: string;
    enrolledCourses?: Course[];
}