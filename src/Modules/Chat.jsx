import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatCard } from 'Components/UI/ChatCard'
import { UserContext } from 'Context/userProvider'
import { useChat } from 'Hooks/useChat'
import { useAuth } from 'Hooks/useAuth'
import CryptoJS from 'crypto-js'

import { ReactComponent as NodejsIcon } from 'Resources/Icons/Nodejs.svg'
import { ReactComponent as SocketioIcon } from 'Resources/Icons/Socketio.svg'
import { ReactComponent as Search } from 'Resources/Icons/Search.svg'
import { ReactComponent as AddPeople } from 'Resources/Icons/AddPeople.svg'

import { MessageCard } from 'Components/UI/MessageCard'
import { Loader } from 'Components/UI/Loader'
import { useFetch } from 'Hooks/useFetch'
import { Chats } from 'Components/Layout/Chats'
import { CurrentChat } from 'Components/UI/CurrentChat'
import { Messages } from 'Components/Layout/Messages'
import { FormMessage } from 'Components/Layout/FormMessage'
import { Profile } from 'Components/Layout/Profile'
import { SearchInput } from 'Components/UI/SearchInput'
import { SearchResult } from 'Components/Layout/SearchResult'

export const Chat = () => {

    const [message, setMessage] = useState()
    const [username, setUsername] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [currentIndex, setCurrentInedx] = useState(0)

    const { messages, setMessages, update, chats, disconnect, connect, roomConnect, sendMessage, setChats } = useChat()
    
    const { data: users, loading, get, setData_ } = useFetch()
    
    useEffect(() => {
        !username && setData_(null)
        !username && setUsername(null)
    }, [username])

    useEffect(() => {
        connect()
    }, [])
    
    useEffect(() => {
        if (!currentChat) {
            // console.log('No existe un chat seleccionado');
        } else {
            if (currentChat.id_room) {
                const list = chats
                const updatedChat = list.filter(item => {
                    return item.id_room == currentChat.id_room
                })
                setCurrentChat(updatedChat[0])
            }
        }
    }, [chats])
    
    useEffect(() => {
        if (chatRef && chatRef.current) {
            const { scrollHeight, clientHeight } = chatRef.current;
            chatRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages])
    
    
    const chatRef = useRef()
    const inputRef = useRef()

    // https://chat-socket-io-express.onrender.com

    return (
        <main className='main_chat'>
            <div className='sidebar_chat'>
                <div className="header_profile">
                    <Profile functions={{
                        disconnect
                    }} />
                    <SearchInput state={{ setUsername, loading }} functions={{inputRef, get}} />
                    <SearchResult users={users} functions={{
                        setCurrentChat, setMessages, setData_
                    }} />
                </div>

                <Chats chats={chats} functions={{
                    roomConnect,
                    setCurrentChat,
                    setCurrentInedx,
                    inputRef,
                    users: users
                }} />
            </div>

            <div className="messages">

                {currentChat ?
                    <>
                        <CurrentChat current_chat={currentChat} />
                        <Messages messages={messages} functions={{ chatRef }} />
                        <FormMessage functions={{
                            currentChat: currentChat,
                            setCurrentChat,
                            messages: messages,
                            setMessages,
                            sendMessage,
                            roomConnect,
                            update
                        }}
                            state_message={{ setMessage, message }}
                        />
                    </>
                    :
                    <div className="information_app">
                        <div className='icons_app'>
                            <NodejsIcon className='icon_nodejs' />
                            <SocketioIcon className='icon_socketio' />
                        </div>
                    </div>
                }
            </div>

        </main >
    )
}
