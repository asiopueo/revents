import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useAppDispatch } from "../../../lib/store/store";
import { useParams } from "react-router";
import { selectEvent } from "../eventSlice";
import { useEffect } from "react";

export default function EventDetails() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string}>();

    useEffect(() => {
        if (id) {
            dispatch(selectEvent(id));
        } 

        return () => {
            dispatch(selectEvent(null));
        }
    }, []);

    return (
        <div className="flex gap-4 w-full">
            <div className="flex flex-col w-2/3 gap-3">
                <EventDetailedHeader />
                <EventDetailedInfo />
                <EventDetailedChat />
            </div>
            <div className="w-1/3">
                <EventDetailedSidebar />
            </div>
        </div>
    )
}