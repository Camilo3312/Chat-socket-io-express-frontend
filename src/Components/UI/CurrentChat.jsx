import React from 'react'

export const CurrentChat = ({current_chat}) => {
    return (
        <header className="info_curent_chat">
            <div className="profile_current_chat">
                <img className='image_my_profile' src={current_chat?.image_profile} alt="" />
                {
                    current_chat.connection_state == 1 ?
                        <div className="user_connected"></div>
                        :
                        <div className="user_disconnected"></div>
                }
            </div>
            <div className="info_profile">
                <p className='full_name'>{current_chat?.username}</p>
                {
                    current_chat.connection_state == 1 ?
                        <p className='info_connection_state'>Online</p>
                        :
                        <p className='info_connection_state'>Disconected</p>

                }
            </div>
        </header>
    )
}
