import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Vacancy } from '../types/vacancy.ts';

const VacancyModal: React.FC<{ open: boolean; onClose: () => void; onSave: (data: Vacancy) => void; }> = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState<Vacancy>({
        companyName: '',
        vacancy: '',
        salaryRange: { min: 0, optimal: 0 },
        status: '',
        note: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'min' || name === 'optimal') {
            setForm({
                ...form,
                salaryRange: { ...form.salaryRange, [name]: Number(value) },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSave = () => {
        onSave(form);
        onClose();
        setForm({
            companyName: '',
            vacancy: '',
            salaryRange: { min: 0, optimal: 0 },
            status: '',
            note: '',
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавить отклик</DialogTitle>
            <DialogContent>
                <TextField name="companyName" label="Компания" fullWidth margin="normal" onChange={handleChange} value={form.companyName} />
                <TextField name="vacancy" label="Вакансия" fullWidth margin="normal" onChange={handleChange} value={form.vacancy} />
                <TextField name="min" label="Минимальная зарплата" type="number" fullWidth margin="normal" onChange={handleChange} value={form.salaryRange.min} />
                <TextField name="optimal" label="Оптимальная зарплата" type="number" fullWidth margin="normal" onChange={handleChange} value={form.salaryRange.optimal} />
                <TextField name="status" label="Статус" fullWidth margin="normal" onChange={handleChange} value={form.status} />
                <TextField name="note" label="Заметка" fullWidth margin="normal" multiline rows={4} onChange={handleChange} value={form.note} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default VacancyModal;
