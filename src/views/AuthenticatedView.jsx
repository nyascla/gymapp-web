import React, { useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import { getTodaySession } from '../api/getTodaySession';

import Form from "../components/Form";
import Table from "../components/Table";


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
        
        asyncWrapper();

      }, []);

    return (
        <>
            <Form />
            <Table />
        </>
    );
};


export default AuthenticatedView;
