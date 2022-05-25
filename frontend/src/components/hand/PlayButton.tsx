import { Button } from "@mui/material";

interface StartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const PlayButton = ({ onClick, disabled }: StartButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: "blue",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      GO!!!
    </Button>
  );
};

export default PlayButton;
