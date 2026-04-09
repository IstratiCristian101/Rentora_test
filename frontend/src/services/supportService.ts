import axiosInstance from "../api/axiosInstance";

const BASE = "/support";

export interface SupportCreateDto {
    email:   string;
    subject: string;
    message: string;
}

export const supportService = {
    create: (data: SupportCreateDto): Promise<string> =>
        axiosInstance.post<string>(BASE, data).then(r => r.data),
};
