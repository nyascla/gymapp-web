import React from "react";

import { useAppContext } from "./contexts/AppContext";
import AuthenticatedView from "./views/AuthenticatedView";
import UnauthenticatedView from "./views/UnauthenticatedView";


function App() {
  const { token } = useAppContext(); // Extraer solo el token del contexto

  return (
    <div>
      {token ? (
        <AuthenticatedView />
      ) : (
        <UnauthenticatedView />
      )}
    </div>
  );

};


export default App;
