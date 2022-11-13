import React, { useContext } from 'react'
import { UserContext } from 'Context/userProvider'
import { ReactComponent as Logout } from 'Resources/Icons/Logout.svg'
import { useAuth } from 'Hooks/useAuth'

export const Profile = ({ functions }) => {

    const { userauth: data } = useContext(UserContext)

    const { logout } = useAuth()

    return (

        <div className="header_my_profile">
            <div className='header_info_profile'>
                <img className='image_my_profile' src={data?.picture} alt="" />
                <div className="info_profile">
                    <p className='full_name'>{data?.name}</p>
                </div>
            </div>
            <Logout className='logout_icon' onClick={e => {
                functions.disconnect()
                logout()
            }} />
        </div>

    )
}
