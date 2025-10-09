
export default function EventDetailedHeader() {
    return (
        <div className="card bg-base-100">
            <figure className="h-64 brightness-50 rounded-lg">
                <img src={`/categoryImages/drinks.jpg`} alt='event category image' className="w-full object-cover"/>
            </figure>
            <div className="card-body text-white justify-end absolute bottom-0">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-4xl">Event title</h2>
                        <p>Event date</p>
                        <p>Hosted by Bob</p>
                    </div>
                    <div className="flex flex-col justify-end">
                        <button className="btn btn-primary">Join event</button>
                    </div>
                </div>

            </div>

        </div>
    )
}