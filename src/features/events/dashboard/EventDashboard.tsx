import { useEffect } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import type { AppEvent } from "../../../lib/types";
import { AnimatePresence, motion } from "motion/react";
import Counter from "../../counter/Counter";
import { useAppDispatch, useAppSelector } from "../../../lib/store/store";
import { setEvents } from "../eventSlice";

type Props = {
    formOpen: boolean;
    setFormOpen: (isOpen: boolean) => void;
    formToggle: (event: AppEvent | null) => void;
    selectedEvent: AppEvent | null;
}

export function EventDashboard({ formOpen, setFormOpen, formToggle, selectedEvent }: Props) {
    const dispatch = useAppDispatch();
    const appEvents = useAppSelector(state => state.event.events);
    
    useEffect(() => {
        dispatch(setEvents(events));
    }, []) // dispatch as dependency?

    return (
        <div className="flex flex-row w-full gap-6">
            <div className="w-3/5">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}                    
                    >
                        <div className="flex flex-col gap-4">
                            {appEvents.map(event => (
                                <EventCard 
                                    formToggle={formToggle}
                                    key={event.id} 
                                    event={event}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-2/5">
                <AnimatePresence mode="wait">
                    { formOpen ? (
                        <motion.div
                            key='counter'
                            initial={{ opacity: 0, x: 200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 200 }}
                            transition={{ duration: 0.3, type: 'tween' }}
                        >
                            <EventForm
                                key={selectedEvent?.id || 'new'}
                                setFormOpen={setFormOpen} 
                                selectedEvent={selectedEvent}
                            /> 
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 200 }}
                            transition={{ duration: 0.3, type: 'tween' }}
                        >
                            <Counter />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
