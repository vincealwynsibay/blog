import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (c, _q, _o) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const q = useRef(_q).current;
    const o = useRef(_o).current;

    useEffect(() => {
        let ref = collection(db, c);

        if (q) {
            ref = query(ref, where(...q));
        }

        if (o) {
            ref = query(ref, orderBy(...o));
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                let results = [];

                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                setDocuments(results);
            },
            (err) => {
                setError("could not fetch data");
            }
        );

        return () => unsub();
    }, [c, q, o]);

    return { documents, error };
};
