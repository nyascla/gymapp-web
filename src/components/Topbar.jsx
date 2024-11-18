import React from 'react';
import { Link } from 'react-router-dom';  // Importa Link de React Router
import './Topbar.css';  // Asegúrate de que este archivo CSS esté disponible

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-links">
        <Link to="/" className="topbar-link">Home</Link>
        <Link to="/calendar" className="topbar-link">Calendar</Link>
        <Link to="/weight" className="topbar-link">Weight</Link>
      </div>
    </div>
  );
};

export default Topbar;
