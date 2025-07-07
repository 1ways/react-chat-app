import { useState } from 'react'
import SearchBar from './SearchBar'
import ChatItem from './ChatItem'
import ChatList from './ChatList'

export default function ChatSidebar() {
    const [isSearching, setIsSearching] = useState(false)
    const [result, setResult] = useState(null)
    const [searchText, setSearchText] = useState('')

    return (
        <div className="sidebar">
            <div className="sidebar__search">
                <SearchBar setResult={setResult} setSearchText={setSearchText} setIsSearching={setIsSearching} />
            </div>
            <ul className="sidebar__chats">
                {isSearching ? (
                    <>
                        {result ?
                            Object.values(result).map(item => (
                                <ChatItem key={item.uid} item={item} setSearchText={setSearchText} />
                            )) :
                            null
                        }
                        {searchText ?
                            <p className='sidebar__text'>{searchText}</p> : null
                        }
                    </>
                ) : <ChatList />
                }
            </ul>
        </div>
    )
}