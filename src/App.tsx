import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VacancyPage from './pages/vacancy-page.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VacancyPage />} />
            </Routes>
        </Router>
    );
};

export default App;
