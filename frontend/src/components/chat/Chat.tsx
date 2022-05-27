import { Box, Button } from "@mui/material";
import AllChatLine from "./AllChatLines";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AllChats from "./AllChats";
import { useState } from "react";



const Chat = () => {
    const username = "Stranger01";
    const [chats, setChats] = useState(AllChats);
    const [msg, setMsg] = useState("");
    var chatUsername = ""; 
    var chatText = "";
    var chatLine = "Welcome to Exploding Kittens!";

    function handleSendMsg(newChat: any) {
        
        console.log("SEND!");
    }

    function handleTypeMsg(event: any) {
        setMsg(event.target.value);

    }
    return (
        <Box sx={{backgroundColor: '#383838', width: '386px', borderRadius: '1rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}}>
            <Box sx={{backgroundColor: 'transparent', borderRadius: '1rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', padding: '10px' ,display: 'inline-grid', overflowY: 'scroll', maxHeight: '150px'}}>
                {AllChats.map((chat, index) => {
                    return (
                        <Box key={index} style={{display: 'inline-flex', width: "350px"}} >
                            <label>
                            <span style={{color: "yellow"}}>{chat.username}</span>{": "}
                            <span style={{wordWrap: 'break-word', color: "darkblue"}}>{chat.msg}</span>
                            </label>
                            <br/>
                        </Box>
                    )
                    
                })}
            </Box>
            
            <br/>
            <input
                value={msg}
                name="message"
                placeholder="Type something..."
                style={{width: '300px', padding: '6px 3px', margin: '5px'}}
                onChange={handleTypeMsg}
            />
            <Button onClick={handleSendMsg}>SEND</Button>
        </Box>
    )
}
export default Chat;