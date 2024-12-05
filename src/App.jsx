import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import { useAppContext } from "./contexts/AppContext";

import AuthenticatedView from "./views/AuthenticatedView";
import HistoricView from "./views/HistoricView";
import Calendar from "./views/CalendarView";
import Weight from "./views/WeightView";
import Home from "./views/HomeView";



function App() {
  const { token } = useAppContext(); // Extraer solo el token del contexto

  return (
    <div>
      {/* {token ? (
        <AuthenticatedView />
      ) : (
        <UnauthenticatedView />
      )} */}

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historic" element={<HistoricView />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weight" element={<Weight />} />
      </Routes>
    </div>
  );

};


export default App;
