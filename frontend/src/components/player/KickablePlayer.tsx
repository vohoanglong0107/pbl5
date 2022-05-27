import Image from "next/image";
import Avatar from "../../assets/icon.png";
import { Box, Button } from "@mui/material";
import Player from "@/components/player/Player"

interface KickablePlayerProps {
    players: string[];
  } 

const KickablePlayer = ({players} : KickablePlayerProps) => {
    return (
        <>
            {players.map((item, index) => {
                return (
                    <table key={index} style={{ width: "130%", marginLeft: -10 }}>
                        <tr>
                            <td><Image src={Avatar} width="50%" height="50%"alt="user-avatar" /></td>
                            <td><label style={{textAlign: "left"}}>{item.substring(0,10)}</label></td>
                            <td><Button>KICK</Button></td>
                        </tr>
                    </table>
                )
            })}
            
        </>
    )
}
export default KickablePlayer;