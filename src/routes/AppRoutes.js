import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import WelcomePage from '../components/WelcomePage';
import DisplayDetails from '../components/DisplayDetails';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/registration" replace />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/details" element={<DisplayDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
