import { Box, Typography } from "@mui/material";
import Dot from "./Dot";
import Image from "next/image";
import Shirt from "@/assets/shirtStarting.png";
import UnderW from "@/assets/underw.png";
import CatRunning from "@/assets/giphy.gif";
import Logo from "@/assets/logo.png";
import Loading from "@/assets/loading4.gif";

interface LoadingPageProps {
    pageName: string
}

const LoadingPage = ({pageName} : LoadingPageProps) => {
    return (
        <Box
      sx={{
        backgroundColor: "#EC994B",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box position="relative" width="100vw">
        <Typography sx={{
          color: "#ffffff",
          fontSize: "50px",
          fontFamily: "Ubuntu",
          position: 'absolute',
          width: '100vw', 
          textAlign: 'center',
          margin: '10% auto'
        }}>
          {pageName}
          <br/>
          <Dot />
        </Typography>
        
      </Box>
      <Box position="fixed" display="inline-flex" top="100px" maxHeight="80vh">
        <Box
          sx={{
            maxWidth: "300px",
            maxHeight: '250px',
            position: "relative",
            top: "200px",
            left: "50px",
          }}
        >
          <Image src={Shirt} alt="shirt" width="250%" height="250%" />
        </Box>
        <Box
          sx={{
            maxWidth: "100px",
            maxHeight: "100px",
            position: "relative",
            top: "400px",
            left: "-100px",
          }}
        >
          <Image src={UnderW} alt="underw" width="100%" height="100%" />
        </Box>
        <Box 
          sx={{
            maxWidth: "500px",
            maxHeight: "500px",
            position: "fixed",
            top: "300px",
            left: "200px",
          }}>
          <Image src={CatRunning} alt="cat-running" width="450%" height="450%" />
        </Box>
        <Box
          sx={{
            maxWidth: "100px",
            position: "fixed",
            bottom: "0px",
            right: "0px",
        }}>
          <Image src={Logo} alt="logo" width="100%" height="100%"   />
          </Box>
      </Box>
      
    </Box>
    )
}

export default LoadingPage;