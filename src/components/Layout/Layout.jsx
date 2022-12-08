import React from "react";

import './Layout.css'

import { useState } from 'react'

import { Body } from './Body/Body'
import { Topbar } from './Topbar/Topbar'
import { Sidebar } from './Sidebar/Sidebar'

export const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)  
    const [page, setPage] = useState("Gym") // Peticion para poner ahi el valor del ultimo estado
    const [pageType, setPageType] = useState("0")

    return (
        <div className="ly">
            <Topbar isOpen={isOpen} setIsOpen={setIsOpen}
                    page={page} setPage={setPage}
            />
            
            <Body page={page}
                pageType={pageType}   
            />
            
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}
                    page={page} setPage={setPage}
                    pageType={pageType} setPageType={setPageType}
            />
            
        </div>
    );
}
