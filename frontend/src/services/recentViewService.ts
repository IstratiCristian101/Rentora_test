import axiosInstance from "../api/axiosInstance";

const BASE = "/recent-views";

export interface RecentViewApiDto {
    userId: number;
    apartmentId: number;
    viewedAt: string;
}

export const recentViewService = {
    getByUser: (userId: number): Promise<RecentViewApiDto[]> =>
        axiosInstance.get<RecentViewApiDto[]>(`${BASE}/${userId}`).then(r => r.data),

    add: (userId: number, apartmentId: number): Promise<string> =>
        axiosInstance.post<string>(`${BASE}/${userId}/${apartmentId}`).then(r => r.data),

    clearAll: (userId: number): Promise<string> =>
        axiosInstance.delete<string>(`${BASE}/${userId}`).then(r => r.data),
};
