import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import { useAppContext } from "./contexts/AppContext";
import AuthenticatedView from "./views/AuthenticatedView";
import Calendar from "./views/Calendar";
import Weight from "./views/Weight";


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
        <Route path="/" element={<AuthenticatedView />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weight" element={<Weight />} />
      </Routes>
    </div>
  );

};


export default App;
