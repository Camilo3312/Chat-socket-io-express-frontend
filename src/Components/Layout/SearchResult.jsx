import { UserContext } from 'Context/userProvider'
import React, { useContext } from 'react'

export const SearchResult = ({ users, functions }) => {

    const data = useContext(UserContext)

    return (

        <div className={`search_results ${users && 'show_results'}`}>
            {

                users?.length < 1 ?
                    <div className="users_not_found">
                        <p className='info_users_not_found'>No matches found :(</p>
                    </div>
                    :
                    users?.map((item, index) => (
                        item.id_user != data.id_user &&
                        <div className="card_users" key={index} onClick={() => {
                            functions.setCurrentChat(item)
                            functions.setMessages([])
                            functions.setData_(null)
                        }}>
                            <img className='image_profile_search_user' src={item.image_profile} alt="" />
                            <p className='username_profile_search_user'>{item.username}</p>
                        </div>
                    ))
            }

        </div>
    )
}
