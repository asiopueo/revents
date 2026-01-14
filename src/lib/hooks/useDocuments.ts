import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDocuments, setError, setLoading } from "../firebase/firestoreSlice";
import { toast } from "react-toastify";
import { useCallback, useSyncExternalStore } from "react";
import { convertTimestamps } from "../util/util";
import { db } from "../firebase/firebase";

type Options = {
    path: string;
    id?: string;
    listen?: boolean;
}

export const useDocuments = <T extends DocumentData>({path, id, listen=true}: Options) => {
    const dispatch = useAppDispatch();
    const documentData = useAppSelector(state => id ? state.firestore.documents[path]?.[id] as T : undefined);
    const loading = useAppSelector(state => state.firestore.loading);

    const subscribeToDocuments = useCallback(() => {
        if (!listen || !id) return () => {}; // no-op

        dispatch(setLoading(true));

        const docRef = doc(db, path, id);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (!snapshot.exists()) {
                dispatch(setLoading(false));
                dispatch(setError("Document does not exist"));
                toast.error("Document does not exist");
                return;
            }
            const converted = convertTimestamps(snapshot.data() as T);
            dispatch(setDocuments({path , id, data: {id: snapshot.id, ...converted as T}}));
            dispatch(setLoading(false));
        }, (error) =>{
            console.log(error);
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            toast.error;
        });

        return () => {
            unsubscribe();
        }
    }, [dispatch, path, listen, id]);

    useSyncExternalStore(subscribeToDocuments, () => documentData);

    return { data: documentData, loading };
}