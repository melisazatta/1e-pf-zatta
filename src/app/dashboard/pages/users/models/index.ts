export type UserRole = 'admin' | 'user';

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    role: UserRole,
}
