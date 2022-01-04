import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";

const initialState = {
    document: null,
    success: null,
    isPending: false,
    error: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "PENDING":
            return {
                isPending: true,
                document: null,
                success: null,
                error: null,
            };
        case "ERROR":
            return {
                isPending: false,
                document: null,
                error: action.payload,
                success: false,
            };
        case "ADD_DOCUMENT":
            return {
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };
        case "DELETE_DOCUMENT":
            return {
                isPending: false,
                document: null,
                success: true,
                error: null,
            };
        case "UPDATE_DOCUMENT":
            return {
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };
        case "GET_BLOG":
            return {
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };
        default:
            return state;
    }
};

export const useFirestore = (c) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(null);
    const ref = collection(db, c);

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    };

    const addDocument = async (newDocument) => {
        dispatch({ type: "PENDING" });
        try {
            const createdAt = Timestamp.fromDate(new Date());
            const addedDocument = await addDoc(collection(db, c), {
                ...newDocument,
                createdAt,
            });

            dispatchIfNotCancelled({
                type: "ADD_DOCUMENT",
                payload: addedDocument.id,
            });
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
        }
    };
    const updateDocument = async (id, fields) => {
        dispatch({ type: "PENDING" });
        try {
            const updatedDocument = await updateDoc(doc(db, c, id), {
                ...fields,
            });
            dispatchIfNotCancelled({
                type: "UPDATE_DOCUMENT",
                payload: updatedDocument,
            });
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
        }
    };

    const deleteDocument = async (id) => {
        dispatch({ type: "PENDING" });
        try {
            await deleteDoc(doc(db, c, id));
            dispatchIfNotCancelled({
                type: "DELETE_DOCUMENT",
            });
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
        }
    };

    const getBlog = async (id) => {
        dispatch({ type: "PENDING" });

        try {
            const fetchedBlog = await getDoc(doc(db, c, id));

            dispatchIfNotCancelled({
                type: "GET_BLOG",
                payload: { id: fetchedBlog.id, ...fetchedBlog.data() },
            });
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { response, addDocument, deleteDocument, getBlog, updateDocument };
};
