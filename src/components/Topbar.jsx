import React from 'react';
import { Link } from 'react-router-dom';  // Importa Link de React Router
import '../css/Topbar.css';  // Asegúrate de que este archivo CSS esté disponible
import { useAppContext } from "../contexts/AppContext";

const Topbar = () => {
  const { token, setToken } = useAppContext();

  function handleButton(e) {
    e.preventDefault();
    
    localStorage.setItem('access_token', null);
    setToken(null)
  }

  return (
    <div className="topbar">
      <div className="topbar-links">
        <Link to="/" className="topbar-link">Home</Link>
        <Link to="/historic" className="topbar-link">Historic</Link>
        <Link to="/calendar" className="topbar-link">Calendar</Link>
        <Link to="/weight" className="topbar-link">Weight</Link>
      </div>

      <div className="topbar-info">
        <button onClick={handleButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Topbar;
