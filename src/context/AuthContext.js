import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'


export const AuthContext = createContext()
const initialState = {
    isAuthtenicated: false,
    user: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return {
                isAuthtenicated: true,
                user: action.payload.user
            }

        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
export default function AuthContextProvider(props) {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getProfile(user)
            } else {
                setIsAppLoading(false)
            }
        });
    }, [])
    const getProfile = async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data()
            dispatch({
                type: "SET_LOGGED_IN",
                payload: { user }
            })
        } else {

        }
        setIsAppLoading(false)
    }

    return (
        <>
            <AuthContext.Provider value={
                {
                    ...state,
                    dispatch,
                    isAppLoading,
                    setIsAppLoading,
                    getProfile
                }
            } >
                {props.children}
            </AuthContext.Provider>
        </>
    )
}
export const useAuthContext = () => useContext(AuthContext)