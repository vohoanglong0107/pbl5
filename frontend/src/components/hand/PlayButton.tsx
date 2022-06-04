import { Button, Typography } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

interface StartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const PlayButton = ({ onClick, disabled }: StartButtonProps) => {
  return (
    <Button
      variant="contained"
      
      sx={{
        backgroundColor: "orange",
        '&:hover' : {
          backgroundColor: '#F77E21'
        },
        borderRadius:"100%",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowCircleUpIcon />
    </Button>
  );
};

export default PlayButton;
