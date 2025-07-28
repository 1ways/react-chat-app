import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatInputField from './ChatInputField'
import { setIsLoading } from '../../state/chat/chatSlice'
import { onValue, ref } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import sortMessagesArray from '../../service/sortMessagesArray'
import ChatMessages from './ChatMessages'
import ChatHeader from './ChatHeader'

export default function Chat() {
    const [messages, setMessages] = useState([])

    const chatState = useSelector(state => state.chat.value)
    const isLoading = useSelector(state => state.chat.isLoading)
    const openedUser = useSelector(state => state.chat.openedUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!chatState) return
        setMessages([])

        dispatch(setIsLoading(true))

        const chatMessagesRef = ref(db, `userChats/${chatState}/messages`)

        const unsubscribe = onValue(chatMessagesRef, snapshot => {
            if (snapshot.exists()) {
                const sortedArr = sortMessagesArray(snapshot.val())
                setMessages(sortedArr)
            } else {
                setMessages([])
            }
            dispatch(setIsLoading(false))
        })

        return () => {
            unsubscribe()
        }
    }, [chatState])

    if (messages.length === 0 && isLoading) {
        return (
            <div className="chat">
                <span className="loader"></span>
            </div>
        )
    }

    return (
        <div className="chat">
            {!chatState ? <p className='chat__text'>Select a chat or search for a user to create one</p>
                : (
                    <>
                        <ChatHeader openedUser={openedUser} />
                        <div className="chat__body">
                            <ChatMessages messages={messages} openedUser={openedUser} />
                            <ChatInputField />
                        </div>
                    </>
                )
            }
        </div >
    )
}