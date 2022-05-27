interface ChatLineProps {
    username: string,
    msg: string
}

const ChatLine = ({username, msg} : ChatLineProps) => {
    return (
        <>
            <label>{username}</label>
            <label>{msg}</label>
        </>
    )
}
export default ChatLine;