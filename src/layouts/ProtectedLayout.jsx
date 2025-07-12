import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedLayout() {
    const isLoading = useSelector(state => state.user.isLoading)
    const user = useSelector(state => state.user.value)

    if (isLoading) {
        return <span className="loader"></span>
    }

    return user ? <Outlet /> : <Navigate to='/login' />
}