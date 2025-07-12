import { useEffect, useRef } from 'react'

export default function ChatMessages({ messages, openedUser }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        // scroll to the bottom of the chat
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [messages])

    return (
        <div className="chat__body-messages">
            {messages.length > 0 ? (
                messages.map(message => {
                    const time = new Date(message.createdAt)
                    const formatedTime = time
                        .toLocaleString('en-US',
                            {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })
                    const isOwn = message.sender !== openedUser.uid

                    return (
                        <div
                            className={`chat__body-message${isOwn ? ' chat__body-message--own' : ''}`}
                            key={message.uid}
                        >
                            <p className="chat__body-message-text">{message.content}</p>
                            <p className="chat__body-message-time">{formatedTime}</p>
                        </div>)
                }
                )
            ) :
                <p className="chat__body-text">Start a conversation</p>
            }
            <div ref={bottomRef}></div>
        </div>
    )
}