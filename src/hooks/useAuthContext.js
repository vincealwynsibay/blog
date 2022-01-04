import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuthContext() must be inside an AuthProvider");
    }

    return context;
}
