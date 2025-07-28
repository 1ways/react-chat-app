import { useState } from 'react'
import SidebarSearchBar from './SidebarSearchBar'
import SidebarChatItem from './SidebarChatItem'
import SidebarChatList from './SidebarChatList'
import SidebarFooter from './SidebarFooter'

export default function ChatSidebar() {
    const [isSearching, setIsSearching] = useState(false)
    const [result, setResult] = useState(null)
    const [searchText, setSearchText] = useState('')

    return (
        <div className="sidebar">
            <div className="sidebar__search">
                <SidebarSearchBar setResult={setResult} setSearchText={setSearchText} setIsSearching={setIsSearching} />
            </div>
            <ul className="sidebar__chats">
                {isSearching ? (
                    <>
                        {result ?
                            Object.values(result).map(item => (
                                <SidebarChatItem key={item.uid} item={item} setSearchText={setSearchText} />
                            )) :
                            null
                        }
                        {searchText ?
                            <p className='sidebar__text'>{searchText}</p> : null
                        }
                    </>
                ) : <SidebarChatList />
                }
            </ul>
            <SidebarFooter />
        </div>
    )
}