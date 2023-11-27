import { Student } from "../../students/models";

export interface Course {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    enrolledStudents?: Student[];
}