import { useDispatch } from 'react-redux'
import { auth } from '../../../firebaseConfig'
import { signOut } from 'firebase/auth'
import ProfileModal from '../ProfileModal'
import { useState } from 'react'
import { updateUser } from '../../state/user/userSlice'

export default function SidebarFooter() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    async function handleSignout() {
        try {
            await signOut(auth)
            dispatch(updateUser(null))
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
        <>
            <ProfileModal open={open} setOpen={setOpen} />
            <div className="sidebar__footer">
                <button className='primary-btn' onClick={() => setOpen(true)}>Profile</button>
                <button className='secondary-btn' onClick={handleSignout}>Log out</button>
            </div>
        </>
    )
}