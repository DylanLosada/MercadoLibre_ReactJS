import { createContext } from "react";
import React, { useState, useEffect } from 'react'

export const UserSearchData = createContext()

const UserExportSearchData = ({children}) => {

    const [lastSaw, setLastSaw] = useState('')

    useEffect(() => {
        JSON.parse(localStorage.getItem('lastSaw')) && setLastSaw(JSON.parse(localStorage.getItem('lastSaw')))
    }, [])

    return (
        <UserSearchData.Provider value = {{lastSaw, setLastSaw}}>
            {children}
        </UserSearchData.Provider>
    )
}

export default UserExportSearchData
