import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from 'Hooks/useAuth';
import jwt_decode from "jwt-decode";

export const SingIn = () => {

    const { google_auth, auth, loading } = useAuth()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <main>
            <div className="center_main">
                <div className='login'>
                    <div className="google_login">
                        <div className="information_login">
                            <p className='subtitle'>Login</p>
                            <p className='info'>Chat with Socket.io and Express</p>
                        </div>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                google_auth(jwt_decode(credentialResponse.credential))
                                console.log(jwt_decode(credentialResponse.credential));
                            }}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />
                        {
                            loading ?
                            <p>Loading</p>
                            :
                            null
                        }
                    </div>
                    
                    {/* <div className="test_login">
                        <form className="registry" onSubmit={e => {
                            e.preventDefault()

                            // auth({
                            //     email,
                            //     password
                            // })
                        }}>

                            <input className='input_chat' type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                            <input className='input_chat' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                            <button className='btn_login'>Login</button>
                        </form>
                    </div> */}

                </div>
            </div>
        </main>
    )
}
