import React, { useEffect }from 'react'
import { useLocalStorage } from 'Hooks/useLocalStorage'

export const ChatCard = ({ information }) => {
    const [value, setValue, removeValue] = useLocalStorage('user_auth', null)
    return (
        <div className='chat_card'>
            <div className="user_profile">
                <div className="user_state_connected">
                    {
                        information.connection_state == 1 ?
                            <div className="user_connected"></div>
                            :
                            <div className="user_disconnected"></div>
                    }
                </div>
                <p>{information.is_new_message}</p>
                <div className="image_profile">
                    <img src={information.image_profile} alt="" />
                </div>
            </div>
            <div className="information_room">
                <div className="inforation_user">
                    <p className='user_name'>{information.username}</p>
                    <p className={`last_message ${information.id_user_send_message != value.id_user && information.is_read == 2 && 'new_message_'}`}>{!information.message ? `Inicia una conversacion` : information.message }</p>
                </div>
                <div className="date_last_connected">
                    <p className='last_connected'>{information.date_message}</p>

                    {
                        information.id_user_send_message != value.id_user &&
                            information.is_read == 2 ?
                            <p className='new_message'>New message</p>
                            :
                            <p></p>
                    }
                </div>
            </div>
        </div>
    )
}
