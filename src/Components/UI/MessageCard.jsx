import React, { useEffect } from 'react'

export const MessageCard = ({ data }) => {

    return (
        <div className="message_card">
            <p className='message'>{data?.message}</p>
            <div className="date_card">
                <p className="date_message">{data?.date_message}</p>
            </div>
        </div>
    )
}
