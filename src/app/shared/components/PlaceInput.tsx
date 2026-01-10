import clsx from 'clsx';
import { useState } from 'react';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import type { Suggestion } from '../../../lib/types';
import { DivideIcon } from '@heroicons/react/24/outline';

type Props<T extends FieldValues> = {
    type?: string;
    label: string;
} & UseControllerProps<T>;

export default function PlaceInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?dedupe=1&limit=6&key=pk.1f966d8efdb3e751d5b3375eaeb3a613'

    const fetchSuggestions = async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${locationUrl}&q=${query}`);
            const data = await res.json();
            setSuggestions(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }

    return (
        <label className="floating-label text-left">
            <span>{props.label}</span>
            <input 
                {...field}
                value={field.value ?? ''}
                onChange={e => handleChange(e.target.value)}
                type={props.type}
                className={clsx('input input-lg w-full', {
                    'input-error': !!fieldState.error,
                    'input-success': !fieldState.error && fieldState.isDirty
                })}
                placeholder={props.label} />

            {loading && <div>Loading...</div>}
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map(suggestion => (
                        <li 
                            key={suggestion.place_id}
                            onClick={() => field.onChange(suggestion.display_name)}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}

            {fieldState.error && (
                <div className="validator-hint visible text-error">
                    {fieldState.error.message}
                </div>
            )}
        </label>
    )
}