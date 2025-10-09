import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";
import EventAttendees from "./EventAttendees";

type Props = {
    event: AppEvent;
}

export default function EventCard({ event }: Props) {
    const host = event.attendees.find(x => x.id === event.hostUid);

    return (
        <div className="card bg-base-100 w-full gap-6">
            <div className="card-body">
                <div className="flex gap-3 items-center">
                    <figure className="card-figure w-14 rounded-lg">
                        <img src={host?.photoURL || '/user.png'} alt="user avatar" />
                    </figure>
                    <div>
                        <h2 className="card-title">{event.title}</h2>
                        <p className="text-sm text-neutral">Hosted by {host?.displayName}</p>
                    </div>
                </div>

                <div className="bg-base-200 -mx-6 my-3 px-4 py-2 border-y border-neutral/20-">
                    <EventAttendees attendees={event.attendees} />
                </div>

                <div className="card-actions flex">
                    <div className="flex flex-1">
                        { event.description }
                    </div>
                    <Link to={`/events/${event.id}`} className="btn btn-primary">View</Link>
                </div>
            </div>
        </div>
    )
}
