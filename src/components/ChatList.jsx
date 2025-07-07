import { get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebaseConfig'
import ChatItem from './ChatItem'

export default function ChatList() {
    const userState = useSelector(state => state.user.value)
    const [chats, setChats] = useState(null)

    useEffect(() => {
        async function getUsers() {
            let usersArr = []

            try {
                const snapshot = await get(ref(db, 'userChats'))

                if (snapshot.exists()) {
                    const userChats = snapshot.val()
                    let usersIds = []

                    for (let chat of Object.values(userChats)) {
                        const users = Object.keys(chat.users)
                        const index = users.indexOf(userState.uid)
                        users.splice(index, 1)
                        usersIds.push(...users)
                    }

                    for (let user of usersIds) {
                        const snapshot = await get(ref(db, `users/${user}`))

                        if (snapshot.exists()) {
                            usersArr.push(snapshot.val())
                        }
                    }
                }

            } catch (error) {
                console.log(error)
            }

            setChats(usersArr)
        }

        getUsers()
    }, [])

    return chats ? chats.map(user =>
        <ChatItem key={user.uid} item={user} />
    ) : <p className='sidebar__text'>Loading...</p>
}