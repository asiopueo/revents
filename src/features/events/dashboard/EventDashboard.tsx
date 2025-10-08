import { useEffect } from "react";

import EventCard from "./EventCard";
import Counter from "../../counter/Counter";
import { useAppDispatch, useAppSelector } from "../../../lib/store/store";
import { setEvents } from "../eventSlice";
import { events } from "../../../lib/data/sampleData";

export function EventDashboard() {
    const dispatch = useAppDispatch();
    const { events: appEvents } = useAppSelector(state => state.event);
    
    useEffect(() => {
        dispatch(setEvents(events));
    }, []) // dispatch as dependency?

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
