import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    }, [])

    const value = { currentUser }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
