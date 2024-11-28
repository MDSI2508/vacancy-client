import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import VacancyModal from '../components/VacancyModal.tsx';
import { getVacancy, createVacancy, updateVacancy, deleteVacancy } from '../api/vacancyApi.ts';
import { Vacancy } from '../types/vacancy.ts';
import VacancyTable from '../components/VacancyTable.tsx';

const VacancyPage: React.FC = () => {
    const [vacancy, setVacancy] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                setLoading(true);
                const data = await getVacancy();
                setVacancy(data);
            } catch (error) {
                console.error('Ошибка загрузки вакансий:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    const handleAddVacancy = async (newVacancy: Vacancy) => {
        try {
            const addedVacancy = await createVacancy(newVacancy);
            setVacancy((prevVacancy) => [...prevVacancy, addedVacancy]);
        } catch (error) {
            console.error('Ошибка добавления вакансии:', error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleEditVacancy = async (id: string, updatedRow: Partial<Vacancy>) => {
        try {
            const updatedVacancy = await updateVacancy(id, updatedRow);
            setVacancy((prevVacancy) =>
                // @ts-ignore
                prevVacancy.map((vacancy) => (vacancy._id === id ? { ...vacancy, ...updatedVacancy } : vacancy))
            );
        } catch (error) {
            console.error('Ошибка обновления вакансии:', error);
        }
    };

    const handleDeleteVacancy = async (id: string) => {
        try {
            await deleteVacancy(id);
            setVacancy((prevVacancy) =>
                // @ts-ignore
                prevVacancy.filter((vacancy) => vacancy._id !== id)
            );
        } catch (error) {
            console.error('Ошибка удаления вакансии:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Вакансии</h1>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '20px'}}
                >
                    +
                </Button>
            </Box>

            <VacancyTable
                vacancy={vacancy}
                loading={loading}
                onDelete={handleDeleteVacancy}
                onEdit={handleEditVacancy}
            />
            <VacancyModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddVacancy}
            />
        </div>
    );
};

export default VacancyPage;
