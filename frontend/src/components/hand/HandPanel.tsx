import { Box } from "@mui/material";
import { useIsGameInPlay, useSelfPlayer } from "@/hook/useGameLogic";
import CardSelectTray from "./CardSelectTray";

const CardStackPlaceHolder = () => {
  return <></>;
};

const HandPanel = () => {
  const isGameInPlay = useIsGameInPlay();

  const selfPlayer = useSelfPlayer();

  return (
    <Box width="100%" height="100%">
      {isGameInPlay ? (
        <CardSelectTray cards={selfPlayer!.hand} />
      ) : (
        <CardStackPlaceHolder />
      )}
    </Box>
  );
};

export default HandPanel;
