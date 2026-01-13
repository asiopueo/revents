
import EventCard from "./EventCard";
import Counter from "../../counter/Counter";
import { useAppDispatch, useAppSelector } from "../../../lib/store/store";
import { useCallback, useSyncExternalStore } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../lib/firebase/firebase";
import type { FirestoreAppEvent } from "../../../lib/types";
import { setEvents } from "../eventSlice";

export function EventDashboard() {
    const dispatch = useAppDispatch();
    const { events: appEvents } = useAppSelector(state => state.event);
    
    const listenToEvents = useCallback(() => {
        const q = query(collection(db, 'events'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const events: FirestoreAppEvent[] = [];
            snapshot.forEach((doc) => {
                events.push({id: doc.id, ...doc.data()} as FirestoreAppEvent);
            });
            dispatch(setEvents(events));
        })

        return () => {
            unsubscribe();
        }
    }, [dispatch]);

    useSyncExternalStore(listenToEvents, () => appEvents);

    return (
        <div className="flex flex-row w-full gap-6">
            <div className="w-3/5">
                <div className="flex flex-col gap-4">
                    {appEvents.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event}
                        />
                    ))}
                </div>
            </div>

            <div className="w-2/5">
                <Counter />
            </div>
        </div>
    )
}
