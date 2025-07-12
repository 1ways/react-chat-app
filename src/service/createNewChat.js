import { v4 as uuidv4 } from 'uuid'
import { ref, update } from 'firebase/database'
import { db } from '../../firebaseConfig'

export default async function createNewChat(userState, item) {
    const uid = uuidv4()

    try {
        const chatObj = {
            uid,
            users: {
                [userState.uid]: true,
                [item.uid]: true,
            }
        }

        const updates = {
            [`userChats/${userState.uid}/${uid}`]: {
                ...chatObj,
                otherUser: {
                    uid: item.uid,
                }

            },
            [`userChats/${item.uid}/${uid}`]: {
                ...chatObj,
                otherUser: {
                    uid: userState.uid,
                }
            },
        }

        await update(ref(db), updates)

        return uid
    } catch (error) {
        console.log(error)
        alert(`Something went wrong: ${error.code}`)
    }
}