import Avatar from 'boring-avatars'

export default function ChatHeader({ openedUser }) {
    return (
        <header className="chat__header">
            <div className="chat__header-avatar">
                <Avatar name={`${openedUser.firstName}-${openedUser.uid}`} size={50} />
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
    )
}