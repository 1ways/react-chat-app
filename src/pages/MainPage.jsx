import ChatSidebar from '../components/Sidebar/ChatSidebar'
import Chat from '../components/Chat/Chat'

export default function MainPage() {
    return (
        <main className="main">
            <ChatSidebar />
            <Chat />
        </main>
    )
}