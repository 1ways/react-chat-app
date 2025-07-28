import Avatar from 'boring-avatars'

export default function ProfilePicture({ user, size }) {
    return <Avatar name={user.uid} size={size} />
}