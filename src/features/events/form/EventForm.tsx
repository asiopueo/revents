import { useNavigate } from "react-router";
import { users } from "../../../lib/data/sampleData";
import { useAppDispatch, useAppSelector } from "../../../lib/store/store";
import type { AppEvent } from "../../../lib/types";
import { createEvent, updateEvent } from "../eventSlice";
import { useParams } from "react-router";
import { useEffect } from "react";
import { selectEvent } from '../eventSlice';
import { useForm, type FieldValues } from 'react-hook-form';
import TextInput from "../../../app/shared/components/TextInput";
import { eventFormSchema, type EventFormSchema } from "../../../lib/schemas/eventFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';

export default function EventForm() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(state => state.event.selectedEvent);
    const navigate = useNavigate();
    const { control, handleSubmit, reset, formState: { isValid }} = useForm<EventFormSchema>({
        mode: 'onTouched',
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        }
    });

    useEffect(() => {
        if (id) {
            dispatch(selectEvent(id));
            if (selectedEvent) {
                reset({
                    ...selectedEvent,
                    date: new Date(selectedEvent.date).toISOString().slice(0, 16),
                });
            }
        }  else {
            dispatch(selectEvent(null));
        }
    }, [dispatch, id, selectedEvent, reset]);

    const onSubmit = (data: FieldValues) => {
        if (selectedEvent) {
            dispatch(updateEvent({...selectedEvent, ...data}));
            navigate(`/events/${selectedEvent.id}`);
            return;
        } else {
            const id = crypto.randomUUID();
            const newEvent = {
                ...data,
                id: id,
                hostUid: users[0].uid,
                attendees: [{
                    id: users[0].uid,
                    displayName: users[0].displayName,
                    photoURL: users[0].photoURL,
                    isHost: true,
                }]
            };
            dispatch(createEvent(newEvent as AppEvent));
            navigate(`/events/${id}`);
        }

    }

    return (
        <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
            <h3 className="text-2xl font-semibold text-center text-primary">
                {selectedEvent ? "Edit event" : "Create new event"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                <TextInput 
                    control={control}
                    name='title'
                    label='Title'
                />
                <TextInput 
                    control={control}
                    name='category'
                    label='Category'
                />
                <TextInput 
                    control={control}
                    name='description'
                    label='Description'
                />
                <TextInput 
                    control={control}
                    name='date'
                    label='Date'
                    type='datetime-local'
                    min={new Date()}
                />
                <TextInput 
                    control={control}
                    name='city'
                    label='City'
                />
                <TextInput 
                    control={control}
                    name='venue'
                    label='Venue'
                />
                <div className="flex justify-end w-full gap-3">
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-neutral">Cancel</button>
                    <button type="submit" disabled={isValid} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
