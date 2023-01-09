import React from "react";

import './Layout.css'
import { Body } from './Body/Body'
import { Topbar } from './Topbar/Topbar'
import { Sidebar } from './Sidebar/Sidebar'

export const Layout = () => {
    return (
        <div className="ly">
            <Topbar/>          
            <Body/>
            <Sidebar/>            
        </div>
    );
}
