import React, { useContext } from 'react'
import { ChatCard } from 'Components/UI/ChatCard'
import { UserContext } from 'Context/userProvider'
import { ReactComponent as Search } from 'Resources/Icons/Search.svg'

export const Chats = ({ chats, functions }) => {
    
    const data = useContext(UserContext)

    return (

        <div className="my_chats">

            {
                !functions.users &&
                <>
                    {
                        chats.length > 0 ?

                            chats?.map((item, index) => (
                                <div key={index} onClick={() => {
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
                                <button className="btn_search_people" onClick={() => {
                                    functions.inputRef.current.focus()
                                }}>
                                    <Search className='btn_search_icon' />
                                    <p>Search people</p>
                                </button>
                            </div>
                    }
                </>
            }
        </div>
    )
}
