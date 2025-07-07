import { useDispatch } from 'react-redux'
import { auth } from '../../firebaseConfig'
import { update } from 'firebase/database'
import { signOut } from 'firebase/auth'
import ChatSidebar from '../components/ChatSidebar'
import Chat from '../components/Chat'

export default function MainPage() {
    const dispatch = useDispatch()

    async function handleSignout() {
        try {
            await signOut(auth)
            dispatch(update(null))
        } catch (error) {
            console.log(error.code)
        }
    }

    // signOut(auth)
    // dispatch(update(null))

    return (
        <main className="main">
            <ChatSidebar />
            <Chat />
        </main>
    )
}