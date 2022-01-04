import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const signup = async (email, password, displayName) => {
        setIsPending(true);

        try {
            setError(null);

            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (!res) {
                throw new Error("could not complete sign up");
            }

            updateProfile(res.user, {
                displayName,
            });

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { error, isPending, signup };
};
