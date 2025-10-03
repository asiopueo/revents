import React from 'react'

export default function EventAttendees() {
    return (
        <div className='avatar-group -space-x-4'>
            { Array.from({ length: 5 }).map((_, index) => (
                <div className="avatar" key={index}>
                    <div className='w-12'>
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="attendee avatar" />
                    </div>
                </div>
            ))}
        </div>
    )
}
