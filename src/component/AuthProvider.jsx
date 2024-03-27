import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return () => unsubscribe();

    }, [])

    const value = { currentUser }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
