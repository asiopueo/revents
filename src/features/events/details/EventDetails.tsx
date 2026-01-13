import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useAppDispatch, useAppSelector } from "../../../lib/store/store";
import { useParams } from "react-router";
import { useCallback, useState, useSyncExternalStore } from "react";
import { db } from "../../../lib/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { selectEvent } from "../eventSlice";
import type { FirestoreAppEvent } from "../../../lib/types";

export default function EventDetails() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const selectedEvent = useAppSelector(state => state.event.selectedEvent);
    const [loading, setLoading] = useState(true);

    const listenToEventDetails = useCallback(() => {
        if (!id) return () => {}; // no-op

        const unsubscribe = onSnapshot(doc(db, 'events', id), (doc) => {
            if (doc.exists()) {
                dispatch(selectEvent({...doc.data(), id: doc.id} as FirestoreAppEvent));
                setLoading(false);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [id, dispatch]);

    useSyncExternalStore(listenToEventDetails, () => selectedEvent);

    if (loading) return <div>Loading...</div>

    if (!selectedEvent) return <div>Event not found</div>

    return (
        <div className="flex gap-4 w-full">
            <div className="flex flex-col w-2/3 gap-3">
                <EventDetailedHeader event={selectedEvent}/>
                <EventDetailedInfo event={selectedEvent}/>
                <EventDetailedChat />
            </div>
            <div className="w-1/3">
                <EventDetailedSidebar event={selectedEvent}/>
            </div>
        </div>
    )
}