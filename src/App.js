import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from 'Context/userProvider'
import { Chat } from 'Modules/Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SingIn } from './Modules/SingIn'

export const App = () => {
    return (
        <GoogleOAuthProvider clientId="403007703687-eolarvfjgdf50g80ps8oil1v60g7948e.apps.googleusercontent.com">
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<SingIn />} />
                        <Route path='/chat' element={<Chat />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </GoogleOAuthProvider>
    )
}
