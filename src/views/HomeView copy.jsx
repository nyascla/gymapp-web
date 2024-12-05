import React, { useState, useEffect } from "react";

import Topbar from "../components/Topbar";
import Login from "../components/Login";

import { getLastEntrene } from "../api/getHomeInfo";
import { useAppContext } from "../contexts/AppContext";
import { postSet } from "../api/postSet";

const ExpandableTable = ({data}) => {
    
    const { token } = useAppContext();



    return (
        <>
            {/* <Login /> */}
            <Topbar />
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Título -- Principal</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.rows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                row={row}
                            />
                        ))}
                </tbody>
            </table>
        </>
    );
};

const TableRow = () => {
    return (
        <tr>
        <td onClick={() => toggleRow(rowIndex)} style={{ cursor: "pointer" }}>
            {row.title} {expandedRows.includes(rowIndex) ? "▲" : "▼"}
        </td>
    </tr>
    );
};

const SubTable = () => {
    return (
        <></>
    );
};

const tableData = {
    rows: [
        {
            title: "Título 1",
            subtable: {
                headers: ["Columna 1", "Columna 2", "Columna 3", "Acción"],
                rows: [
                    ["Input A1", "Input A2", "Input A3"],
                    ["Input B1", "Input B2", "Input B3"]
                ]
            }
        },
        {
            title: "Título 2",
            subtable: {
                headers: ["Campo 1", "Campo 2", "Campo 3", "Enviar"],
                rows: [
                    ["Input C1", "Input C2", "Input C3"]
                ]
            }
        },
        {
            title: "Título 5",
            subtable: {
                headers: ["Campo 1", "Campo 2", "Campo 3", "Enviar"],
                rows: [
                    ["Input C1", "Input C2", "Input C3"],
                    ["Input d", "Input d2", "Input d3"]
                ]
            }
        }
    ]
};


const Home = () => {
    return <ExpandableTable data={tableData}/>;
};

export default Home;
