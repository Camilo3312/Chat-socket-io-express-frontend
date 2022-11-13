import { UserContext } from 'Context/userProvider'
import React, { useContext, useState } from 'react'
import { ReactComponent as SendIcon } from 'Resources/Icons/Send.svg'

export const FormMessage = ({functions, state_message}) => {

    const { userauth: data } = useContext(UserContext)

    const [message, setMessage] = useState()

    const getDate = () => {
        const date = new Date()
        const opciones = { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', opciones)
    }

    return (
        <form onSubmit={e => {
            e.preventDefault()
            if (!functions.currentChat.id_room) {

                functions.update({ of_id_user: data.id_user, for_id_user: functions.currentChat.id_user })
                    .then(response => {
                        // console.log('Termino!');
                        // console.log(response[0]);

                        functions.setMessages([...functions.messages, {
                            message: message,
                            date_message: getDate(),
                            id_message: null,
                            id_user: data.id_user,
                        }])

                        functions.sendMessage(message, getDate(), response[0].id_room)

                        functions.roomConnect(response[0].id_room)

                        functions.setCurrentChat({ ...functions.currentChat, id_room: response[0].id_room })


                    })

            } else {

                functions.sendMessage(message, getDate(), functions.currentChat.id_room)
                functions.setMessages([...functions.messages, {
                    message: message,
                    date_message: getDate(),
                    id_message: null,
                    id_user: data.id_user,
                }])
                
            }

            setMessage('')

        }} className='form_send_message'>
            <input className='input_chat' type='text' placeholder='Message...' onChange={e => {
                setMessage(e.target.value)

                // socket.emit('typing', true)
                // setTimeout(() => {
                //     socket.emit('typing', false)
                // }, 2000)
            }
            } value={message} />
            <button className='btn_send_message'>
                <SendIcon className='icon_sendmessage' />
            </button>
        </form>

    )
}
