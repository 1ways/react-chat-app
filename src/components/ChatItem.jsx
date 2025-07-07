import Avatar from 'boring-avatars'
import { get, ref, set, update } from 'firebase/database'
import { db } from '../../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { updateChat, updateOpenedUser } from '../state/chat/chatSlice'

export default function ChatItem({ item }) {
    const userState = useSelector(state => state.user.value)
    const chatState = useSelector(state => state.chat.value)
    const dispatch = useDispatch()

    async function handleClick() {
        let chatId = ''

        try {
            const snapshot = await get(ref(db, 'userChats'))

            if (snapshot.exists()) {
                const userChats = snapshot.val()
                let found = false

                for (const chatKey in userChats) {
                    const chat = userChats[chatKey]
                    const users = chat.users

                    if (users[userState.uid] && users[item.uid]) {
                        found = true
                        chatId = chatKey
                        break
                    }
                }

                if (!found) {
                    await createNewChat(uid)
                }
            } else {
                await createNewChat(uid)
            }

            // open the chat
            if (chatState != chatId) {
                dispatch(updateChat(chatId))
                dispatch(updateOpenedUser(item))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createNewChat() {
        const uid = uuidv4()

        try {
            await set(
                ref(db, `userChats/${uid}`),
                {
                    uid,
                    users: {
                        [item.uid]: true,
                        [userState.uid]: true
                    },
                    messages: {
                        placeholder: true
                    }
                }
            )

            const updates = {}
            updates[`users/${userState.uid}/chats/${uid}`] = true
            updates[`users/${item.uid}/chats/${uid}`] = true

            await update(ref(db), updates)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <li className="sidebar__chats-item" tabIndex={0} onClick={handleClick}>
            <div className="sidebar__chats-avatar">
                <Avatar name={item.uid} size={50} />
            </div>
            <div className="sidebar__chats-content">
                <div className="sidebar__content-top">
                    <p className="sidebar__content-title">{item.firstName} {item.lastName}</p>
                    <p className="sidebar__content-time"></p>
                </div>
                <p className="sidebar__chats-last"></p>
            </div>
        </li>
    )
}