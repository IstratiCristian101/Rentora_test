import axios from "axios";
import type { User } from "../types/user.types";

const BASE = "http://localhost:5062/api/users";

export interface UserApiDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthday: string;
    gender?: string | null;
    accountBalance: number;
    role: number;
}

export interface UserUpdateDto {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    gender?: string;
}

/** Maps API DTO → frontend User type (for backwards-compatible components) */
export function mapUserApiToUser(dto: UserApiDto): User {
    return {
        Id_User:      dto.id,
        Name:         dto.name,
        Surname:      dto.surname,
        Password:     "",
        Email:        dto.email,
        Phone:        dto.phone,
        Birthday:     dto.birthday.split("T")[0],
        Gender:       dto.gender ?? "",
        Account_sold: Number(dto.accountBalance),
    };
}

export const userService = {
    getAll: (): Promise<UserApiDto[]> =>
        axios.get<UserApiDto[]>(BASE).then(r => r.data),

    getById: (id: number): Promise<UserApiDto> =>
        axios.get<UserApiDto>(`${BASE}/${id}`).then(r => r.data),

    update: (id: number, data: UserUpdateDto): Promise<string> =>
        axios.put<string>(`${BASE}/${id}`, data).then(r => r.data),

    delete: (id: number): Promise<string> =>
        axios.delete<string>(`${BASE}/${id}`).then(r => r.data),
};
