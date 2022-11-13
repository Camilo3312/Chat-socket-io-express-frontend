import React, { createContext } from 'react'
import { useLocalStorage } from 'Hooks/useLocalStorage'


export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {

    const [userauth, setUserauth] = useLocalStorage('user_auth')

    const is_auth = () => {
        if(userauth?.auth) 
            return true 
        else
            return false
    }

    const data = { userauth, is_auth }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}