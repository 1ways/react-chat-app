import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { child, get, ref } from 'firebase/database'
import { auth, db } from '../firebaseConfig'
import { update, setIsLoading } from './state/user/userSlice'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'

import ProtectedLayout from './layouts/ProtectedLayout'

export default function App() {
    const userState = useSelector(state => state.user.value)
    const dispatch = useDispatch()

    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                const dbRef = ref(db)
                const snapshot = await get(child(dbRef, `users/${user.uid}`))

                if (!userState) {
                    dispatch(update(snapshot.val()))
                }
            } else {
                dispatch(update(null))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route element={<ProtectedLayout />}>
                    <Route path='/' element={<MainPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}