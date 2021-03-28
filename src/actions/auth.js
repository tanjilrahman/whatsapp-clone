import { auth, provider } from '../firebase/firebase';

export const login = (user) => ({
    type: 'LOGIN',
    user
})

export const startLogin = () => {
    return () => {
        auth.signInWithPopup(provider)
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return auth.signOut()
    }
}