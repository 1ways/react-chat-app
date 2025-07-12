import Avatar from 'boring-avatars'
import { useDispatch, useSelector } from 'react-redux'
import { updateChat, updateOpenedUser } from '../state/chat/chatSlice'
import createNewChat from '../service/createNewChat'
import checkExistingChat from '../service/checkExistingChat'

export default function ChatItem({ item }) {
    const userState = useSelector(state => state.user.value)
    const chatState = useSelector(state => state.chat.value)
    const dispatch = useDispatch()

    async function handleClick() {
        try {
            let { chatId, found } = await checkExistingChat(userState, item)

            if (!found) {
                chatId = await createNewChat(userState, item)
            }

            // open the chat
            if (chatState != chatId) {
                dispatch(updateChat(chatId))
                dispatch(updateOpenedUser(item))
            }
        } catch (error) {
            console.log(error)
            alert(`Something went wrong: ${error.code}`)
        }
    }

    return (
        <li
            className="sidebar__chats-item"
            aria-label={`Chat with ${item.firstName} ${item.lastName}`}
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
        >
            <div className="sidebar__chats-avatar">
                <Avatar name={`${item.firstName}-${item.uid}`} size={50} />
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