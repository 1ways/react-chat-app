import { get, ref } from 'firebase/database'
import { db } from '../../firebaseConfig'

export default async function getChatList(userState) {
    let usersIds = []
    let usersArr = []

    try {
        const snapshot = await get(ref(db, `userChats/${userState.uid}`))

        if (snapshot.exists()) {
            for (let chat of Object.values(snapshot.val())) {
                usersIds.push(chat.otherUser.uid)
            }

            const uniqueUsersIds = [...new Set(usersIds)]

            const userSnapshots = await Promise.all(
                uniqueUsersIds.map(userId => get(ref(db, `users/${userId}`)))
            )

            userSnapshots.forEach(snapshot => {
                if (snapshot.exists()) {
                    usersArr.push(snapshot.val())
                }
            })
        }

        return usersArr
    } catch (error) {
        throw new Error('Something went wrong' + error)
    }
}