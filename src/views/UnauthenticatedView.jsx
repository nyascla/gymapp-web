import React from "react";

import { useAppContext } from "../contexts/AppContext";
import Login from "../components/Login";


const UnauthenticatedView = () => {
    const { setToken } = useAppContext();

    return <Login setToken={setToken} />;
};

export default UnauthenticatedView;