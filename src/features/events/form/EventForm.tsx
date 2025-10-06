import { users } from "../../../lib/data/sampleData";
import type { AppEvent } from "../../../lib/types";

type Props = {
    setFormOpen: (isOpen: boolean) => void;
    createEvent: (event: AppEvent) => void;
}

export default function EventForm({ setFormOpen, createEvent }: Props) {

    const onSubmit = (formData: FormData) => {
        const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;
        
        createEvent({
            ...data,
            id: crypto.randomUUID(),
            hostUid: users[0].uid,
            attendees: [{
                id: users[0].uid,
                displayName: users[0].displayName,
                photoURL: users[0].photoURL,
                isHost: true,
            }]
        });

        setFormOpen(false);
    }

    return (
        <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
            <h3 className="text-2xl font-semibold text-center text-primary">Create new event</h3>
            <form action={onSubmit} className="flex flex-col gap-3 w-full">
                <input name='title' type="text" className="input input-lg w-full" placeholder="Event title" />
                <input name='category' type="text" className="input input-lg w-full" placeholder="Category" />
                <textarea name='description' className="text-area textarea-lg w-full" placeholder="Description" />
                <input name='date' type="datetime-local" className="input input-lg w-full" placeholder="Date" />
                <input name='city' type="text" className="input input-lg w-full" placeholder="City" />
                <input name='venue' type="text" className="input input-lg w-full" placeholder="Venue" />
                <div className="flex justify-end w-full gap-3">
                    <button type="button" onClick={() => setFormOpen(false)} className="btn btn-neutral">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
