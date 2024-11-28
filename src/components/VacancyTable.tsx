import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {SalaryRange, Vacancy} from '../types/vacancy';

interface VacancyTableProps {
    vacancy: Vacancy[];
    loading: boolean;
    onDelete: (id: string) => void;
    onEdit: (id: string, newRow: Partial<Vacancy>) => void;
}

const VacancyTable: React.FC<VacancyTableProps> = ({
                                                       vacancy,
                                                       loading,
                                                       onDelete,
                                                       onEdit,
                                                   }) => {
    const columns: GridColDef[] = [
        { field: 'companyName', headerName: 'Компания', width: 200, editable: true },
        { field: 'vacancy', headerName: 'Вакансия', width: 200, editable: true },
        {
            field: 'salaryRange',
            headerName: 'Зарплата',
            width: 300,
            valueGetter: (params:Partial<SalaryRange>) => {
                return `${params.min} - ${params.optimal}`

            },
            editable: true,
        },
        { field: 'status', headerName: 'Статус', width: 250, editable: true },
        { field: 'note', headerName: 'Заметка', width: 250, editable: true },
        {
            field: 'actions',
            headerName: 'Действия',
            width: 250,
            renderCell: (params) => (
                <button onClick={() => onDelete(params.row._id)}>Удалить</button>
            ),
        },
    ];

    const handleProcessRowUpdate = async (newRow: Partial<Vacancy>, oldRow: Partial<Vacancy>) => {
        try {
            const updatedRow: Partial<Vacancy> = { ...newRow };
            if (typeof updatedRow.salaryRange === 'string') {
                const [min, optimal] = updatedRow.salaryRange
                    // @ts-ignore
                    .split('-')
                    // @ts-ignore
                    .map((value) => parseInt(value.trim(), 10));
                updatedRow.salaryRange = { min, optimal };
            }
            // @ts-ignore
            await onEdit(updatedRow._id, updatedRow);

            return updatedRow;
        } catch (error) {
            console.error('Ошибка обновления строки:', error);

            return oldRow;
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={vacancy}
                columns={columns}
                loading={loading}
                // @ts-ignore
                getRowId={(row) => row._id}
                processRowUpdate={handleProcessRowUpdate}
            />
        </div>
    );
};

export default VacancyTable;
