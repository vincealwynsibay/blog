import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";
export const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthReady: false,
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case "READY_AUTH":
            return { ...state, isAuthReady: true, user: action.payload };
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({ type: "READY_AUTH", payload: user });
            unsub();
        });
    }, []);

    console.log("user: ", state.user);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
