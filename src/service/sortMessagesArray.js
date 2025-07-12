export default function sortMessagesArray(obj) {
    if (obj) {
        return Object.values(obj).sort((a, b) => a.createdAt - b.createdAt)
    } else {
        return []
    }
}