import React, { useContext } from 'react'
import { ChatCard } from 'Components/UI/ChatCard'
import { UserContext } from 'Context/userProvider'
import { ReactComponent as Search } from 'Resources/Icons/Search.svg'
import { useRef } from 'react'

export const Chats = ({ chats, functions }) => {
    
    const { userauth: data } = useContext(UserContext)
    const chatRef = useRef()

    return (
        <div className="my_chats">
            {
                !functions.users &&
                <>
                    {
                        chats.length > 0 ?

                            chats?.map((item, index) => (
                                <div className='btn_chat' key={index} onClick={(e) => {
                                    functions.roomConnect(item.id_room)
                                    functions.setCurrentChat(item)
                                    functions.setCurrentInedx(index)
                                }}>
                                    <ChatCard key={index} information={
                                        {
                                            ...item,
                                            is_new_message: item.id_user !== data.is_user ? true : false
                                        }
                                    } />
                                </div>
                            ))
                            : 
                            <div className="search_more_people">
                                <p>No have chats</p>
                            </div>
                    }
                </>
            }
        </div>
    )
}
