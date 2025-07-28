import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatItem from './SidebarChatItem'
import getChatList from '../../service/getChatList'

export default function SidebarChatList() {
    const userState = useSelector(state => state.user.value)
    const [chats, setChats] = useState(null)

    useEffect(() => {
        getChatList(userState)
            .then(chatsArr => {
                setChats(chatsArr)
            })
            .catch(error => {
                console.log(error)
                alert(`Something went wrong: ${error}`)
            })
    }, [userState.uid])

    return chats ? chats.map(user =>
        <ChatItem key={user.uid} item={user} />
    ) : <p className='sidebar__text'>Loading...</p>
}