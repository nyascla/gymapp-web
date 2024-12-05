import React, { useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import { getTodaySession } from '../api/getTodaySession';


import Login from "../components/Login";
import Topbar from "../components/Topbar";
import Historic from "../components/Historic";


const HistoricView = () => {
    const { exercises } = useAppContext();


    return (
        <>
            <Login />
            <Topbar/>
            <Historic exercises={exercises}/>
        </>
    );
};


export default HistoricView;
