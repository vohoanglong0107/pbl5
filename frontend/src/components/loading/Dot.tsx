import { Box } from "@mui/material";
import { styled } from "@mui/system";

interface DotStyleProps {
  delayTime: string
}
const DotStyle = styled(Box)((props : DotStyleProps) => ({
    height: '15px',
    width: '15px',
    borderRadius: '100%',
    margin: '10px',
    backgroundColor: 'white',
    animationName: 'pulsate',
    animationDuration: '1.2s', 
    animationTimingFunction: 'ease-out', 
    animationDelay: props.delayTime,
    animationDirection: 'alternate',
    animationIterationCount: "infinite",
    animationFillMode: "none",
    animationPlayState: "running",
    "@keyframes pulsate": {
        from: {
          opacity: 1,
          transform: "scale(1)"
        },
        to: {
          opacity: 0,
          transform: "scale(2)"
        }
      },
      // animation: "pulsate 2s infinite ease",
      position: "relative",
      bottom: '20px'
}))


const Dot = () => {
    return (
      <Box sx={{display: 'inline-flex', }}>
        <DotStyle delayTime="0s"  />
        <DotStyle delayTime="0.4s" />
        <DotStyle delayTime="0.8s" />
      </Box>
        
    )
}
export default Dot;