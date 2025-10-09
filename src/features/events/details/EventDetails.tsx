import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetails() {
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