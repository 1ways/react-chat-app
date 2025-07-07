import { equalTo, get, orderByChild, query, ref } from 'firebase/database'
import { db } from '../../firebaseConfig'
import { useSelector } from 'react-redux'

export default function SearchBar({ setResult, setSearchText, setIsSearching }) {
    const userState = useSelector(state => state.user.value)

    async function handleChange(e) {
        setResult(null)
        setIsSearching(true)
        setSearchText('')

        if (e.currentTarget.value === userState.username) {
            setSearchText("Can't search for youself")
            return
        }

        if (e.currentTarget.value === '') {
            setIsSearching(false)
            return
        }

        try {
            setSearchText('Searching...')
            const usersRef = ref(db, 'users')
            const q = query(usersRef, orderByChild('username'), equalTo(e.currentTarget.value))

            const snapshot = await get(q)

            if (!snapshot.exists()) {
                setSearchText('User not found')
            } else {
                setSearchText('')
                setResult(snapshot.val())
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="search-bar">
            <input
                className='search-bar__input'
                type="text"
                placeholder='Search'
                onChange={handleChange}
            />
        </div>
    )
}