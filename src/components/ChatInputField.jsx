import { useRef } from 'react'
import sendIcon from '../assets/images/send.png'
import { useSelector } from 'react-redux'
import { ref, update } from 'firebase/database'
import { db } from '../../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export default function ChatInputField() {
    const userState = useSelector(state => state.user.value)
    const chatState = useSelector(state => state.chat.value)
    const inputRef = useRef(null)

    async function handleClick(e) {
        e.preventDefault()

        if (inputRef.current.value !== '') {
            try {
                const uid = uuidv4()
                const messageData = {
                    uid,
                    content: inputRef.current.value,
                    sender: userState.uid,
                    createdAt: new Date().getTime()
                }

                await update(ref(db), {
                    [`userChats/${chatState}/messages/${uid}`]: messageData
                })

                console.log('message sent')
                inputRef.current.value = ''
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <form className="chat__body-textfield">
            <input className='chat__body-input' type="text" placeholder='Type something...' ref={inputRef} />
            <button className='chat__body-btn' onClick={handleClick}>
                <img src={sendIcon} alt="send icon" />
            </button>
        </form>
    )
}