import { useDispatch } from 'react-redux'
import { auth } from '../../firebaseConfig'
import { update } from 'firebase/database'
import { signOut } from 'firebase/auth'

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

    return (
        <>
            <h1>Main Page</h1>
            <button onClick={handleSignout}>Sign out</button>
        </>
    )
}