import { useSelector } from 'react-redux'
import ChatInputField from './ChatInputField'
import Avatar from 'boring-avatars'


export default function Chat() {
    const chatState = useSelector(state => state.chat.value)
    const openedUser = useSelector(state => state.chat.openedUser)

    return (
        <div className="chat">
            {!chatState ? <p className='chat__text'>Select a chat or search for a user to create one</p>
                : (
                    <>
                        <header className="chat__header">
                            <div className="chat__header-avatar">
                                <Avatar name={openedUser.uid} size={50} />
                            </div>
                            <div className="chat__info">
                                <h1 className='chat__info-title'>{openedUser.firstName} {openedUser.lastName}</h1>
                                <p className='chat__info-text'>online</p>
                            </div>
                            <button className="chat__more">
                                <span className="chat__more-dot"></span>
                                <span className="chat__more-dot"></span>
                                <span className="chat__more-dot"></span>
                            </button>
                        </header>
                        <div className="chat__body">
                            <div className="chat__body-messages">
                                <p className="chat__body-text">Start a conversation</p>
                            </div>
                            <ChatInputField />
                        </div>
                    </>
                )}
        </div>
    )
}