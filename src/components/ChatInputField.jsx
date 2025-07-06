import sendIcon from '../assets/images/send.png'

export default function ChatInputField() {
    return (
        <div className="chat__body-textfield">
            <input className='chat__body-input' type="text" placeholder='Type something...' />
            <button className='chat__body-btn'>
                <img src={sendIcon} alt="send icon" />
            </button>
        </div>
    )
}