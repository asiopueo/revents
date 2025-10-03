import EventAttendees from "./EventAttendees";

export default function EventCard() {
    return (
        <div className="card bg-base-100 w-full gap-6">
            <div className="card-body">
                <div className="flex gap-3 items-center">
                    <figure className="card-figure w-14 rounded-lg">
                        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="user avatar" />
                    </figure>
                    <div>
                        <h2 className="card-title">Card Title</h2>
                        <p className="text-sm text-neutral">Hosted by Bob</p>
                    </div>
                </div>

                <div className="bg-base-200 -mx-6 my-3 px-4 py-2 border-y border-neutral/20-">
                    <EventAttendees />
                </div>

                <div className="card-actions flex">
                    <div className="flex flex-1">
                        Description
                    </div>
                    <button className="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    )
}
