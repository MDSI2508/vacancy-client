import axios from 'axios';
import { Vacancy } from '../types/vacancy.ts';

const serverApi = import.meta.env.VITE_APP_SERVER_API || "http://localhost:5000/";

const apiServer = axios.create({
    baseURL: serverApi,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getVacancy = async (): Promise<Vacancy[]> => {
    const response = await apiServer.get('/vacancy');
    return response.data;
};

export const createVacancy = async (vacancy: Vacancy): Promise<Vacancy> => {
    const response = await apiServer.post('/vacancy/create', vacancy);
    return response.data;
};

export const updateVacancy = async (id: string, vacancy: Partial<Vacancy>): Promise<Vacancy> => {
    const response = await apiServer.patch(`/vacancy/update/${id}`, vacancy);
    return response.data;
};

export const deleteVacancy = async (id: string): Promise<void> => {
    await apiServer.delete(`/vacancy/delete-vacancy/${id}`);
};
