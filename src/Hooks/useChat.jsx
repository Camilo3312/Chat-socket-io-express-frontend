import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../Context/userProvider';
import addNotification from 'react-push-notification'

const socket = io(process.env.REACT_APP_API_URL)

export const useChat = () => {
    const data = useContext(UserContext)
    const { userauth } = data
    const [loadingChats, setLoadingChats] = useState(null)
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])

    const render_chats = async () => {
        socket.emit('chats', userauth?.id_user)

    }

    const push_notification = () => {
        addNotification({
            title: 'You have a message',
            message: 'Hello',
            duration: 5000,
            icon: 'https://cdn.worldvectorlogo.com/logos/socket-io.svg',
            native: true,
            onClick: () => window.loation = 'https://www.youtube.com/watch?v=hdf1iLzhaCQ'
        })
    }


    useEffect(() => {
        const reciveMessage = (message, id_user, date, room) => {
            setMessages([...messages, {
                date_message: date,
                id_message: null,
                id_user: id_user,
                message: message,
            }])
        }

        const reciveChats = async (datas) => {
            setChats(datas)
            setLoadingChats(false)
        }

        const new_message = () => {
            render_chats()
        }

        const notification = (data) => {
            console.log(data);
            push_notification()
        }

        socket.on('chats', reciveChats)
        socket.on('message', reciveMessage)
        socket.on('new_message', new_message)
        socket.on('user_notification', notification)
        render_chats()

        return () => {
            socket.off('message', reciveMessage)
            socket.off('chats', reciveChats)
            socket.on('new_message', new_message)
            socket.off('user_notification', notification)
        }
    }, [messages])


    const getMessages = async (currentRoom) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/messages/${currentRoom}`)
            .then(response => {
                setMessages(response.data)
            })
    }

    const sendMessage = (message, date, room) => {
        socket.emit('message', message, userauth?.id_user, date, room)
        socket.emit('user_notification', { message, user: userauth?.name, room })
        render_chats()
    }

    const update = async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, data)
            .then(response => {
                // console.log(response.data)
                // setMessages(response.data)
                socket.emit('update')
                return response.data
            })

        return response
    }

    const roomConnect = (room) => {
        socket.emit('connectRoom', room)
        getMessages(room)
    }

    const connect = () => {
        setLoadingChats(true)
        socket.emit('userconnection', userauth?.id_user)
    }

    const disconnect = () => {
        socket.emit('disconnected', userauth?.id_user)
    }

    return {
        messages,
        chats,
        setChats,
        sendMessage,
        roomConnect,
        connect,
        setMessages,
        disconnect,
        update,
        loadingChats
    }
}
