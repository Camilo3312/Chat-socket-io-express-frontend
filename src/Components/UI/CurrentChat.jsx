import React from 'react'
import { ReactComponent as ArrowLeft } from 'Resources/Icons/ArrowLeft.svg'

export const CurrentChat = ({current_chat, references}) => {
    return (
        <header className="info_curent_chat">
            <ArrowLeft onClick={e => {
                references.sidebarRef.current.classList.remove('ocult')
                references.messagesRef.current.classList.remove('show')    
            }} className='arrow_left'/>
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
