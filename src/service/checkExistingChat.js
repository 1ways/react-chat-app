import { get, ref } from 'firebase/database'
import { db } from '../../firebaseConfig'

export default async function checkExistingChat(userState, item) {
    let chatId = ''
    let found = false

    try {
        const snapshot = await get(ref(db, `userChats/${userState.uid}`))

        if (snapshot.exists()) {
            const userChats = snapshot.val()

            for (const chatKey in userChats) {
                const chat = userChats[chatKey]
                const users = chat.users

                if (users[userState.uid] && users[item.uid]) {
                    found = true
                    chatId = chatKey
                    break
                }
            }
        }

        return {
            chatId,
            found
        }
    } catch (error) {
        console.log(error)
        alert(`Something went wrong: ${error}`)
    }
}