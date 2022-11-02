import { MessageCard } from 'Components/UI/MessageCard'
import { UserContext } from 'Context/userProvider'
import React, { useContext } from 'react'

export const Messages = ({ messages, functions }) => {
    const data = useContext(UserContext)
    return (
        <div ref={functions.chatRef} className="chat_messages">
            {
                messages?.length < 1 ?
                    <div className="brefore_sending_message">
                        <p className='title_before_sending'>Start a new conversation</p>
                        <p className='message_before_sending'>
                            Write yor first message
                        </p>
                    </div>
                    :
                    messages?.map((item, index) => (
                        <div key={index} className={`message_order ${item.id_user != data.id_user ? 'in' : 'out'}`}>
                            <MessageCard key={index} data={item} />
                        </div>
                    ))
            }
        </div>
    )
}
