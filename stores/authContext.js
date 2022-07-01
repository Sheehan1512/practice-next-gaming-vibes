import { createContext, useEffect, useState } from "react";
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export function AuthContextProvider({children}) {
    
    const [user, setUser] = useState(null)

    useEffect(() => {

        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()
        })

        netlifyIdentity.on('logout', () => {
            setUser(null)
        })

        netlifyIdentity.init()

        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }

    }, [])

    function login() {
        netlifyIdentity.open()
    }

    function logout() {
        netlifyIdentity.logout()
    }

    const context = {user, login, logout}

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;