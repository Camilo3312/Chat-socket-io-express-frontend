import React, { useRef } from 'react'
import { Loader } from './Loader'
import { ReactComponent as Search } from 'Resources/Icons/Search.svg'

export const SearchInput = ({ state, functions }) => {

    return (
        <div className="search_users">
            <div className="input_search">
                <Search className='search_icon' />
                <input type="search" className='search_all_users' placeholder='search people' ref={functions.inputRef} onChange={e => {
                    state.setUsername(e.target.value)
                    e.target.value &&
                        functions.get(`${process.env.REACT_APP_API_URL}/get_users/${e.target.value}`)

                }} name="" id="" />
                <div className="loader_search">
                    {
                        state.loading &&
                        <Loader className='loader_search_users' />
                    }
                </div>
            </div>
        </div>
    )
}
