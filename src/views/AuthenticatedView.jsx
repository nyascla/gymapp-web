import React, { useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import { getTodaySession } from '../api/getTodaySession';

import Form from "../components/Form";
import Table from "../components/Table";
import Login from "../components/Login";
import Topbar from "../components/Topbar";

const AuthenticatedView = () => {
    const { token, setSession } = useAppContext();

    useEffect(() => {
        const asyncWrapper = async () => {
          try {
            const s = await getTodaySession(token);
            setSession(s);
          } catch (error) {
            console.error('Error fetching session:', error);
          }
        };
        
        if (token != null) {
          asyncWrapper();
        }

      }, [token]);

    return (
        <>
            <Login />
            <Topbar/>
            <Form />
            <Table />
        </>
    );
};


export default AuthenticatedView;
