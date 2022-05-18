import { selectGameCurrentState, selectPlayers } from "@/lib/selector";
import { selectUser } from "@/components/user/userSlice";
import { useSelector } from "react-redux";
import { PlayState, TargetingState } from "@/components/game/GameState";

export function useIsGameInPlay() {
  const currentGameState = useSelector(selectGameCurrentState);
  return !(
    currentGameState.type === "IdleState" ||
    currentGameState.type === "OverState"
  );
}

export function useIsCurrentPlayerTurn(playerId: string) {
  const currentGameState = useSelector(selectGameCurrentState);
  const isGameInPlay = useIsGameInPlay();
  // Not only PlayState but also other state like TargetingState
  const currentPlayer = (currentGameState as PlayState | TargetingState)
    .currentPlayer;
  return isGameInPlay && playerId === currentPlayer.id;
}

export function useCanSelfPlay() {
  const currentGameState = useSelector(selectGameCurrentState);
  const self = useSelector(selectUser);
  if (currentGameState.type !== "PlayState") return false;
  const currentPlayer = (currentGameState as PlayState).currentPlayer;
  return self.id === currentPlayer.id;
}

export function useSelfPlayer() {
  const players = useSelector(selectPlayers);
  const self = useSelector(selectUser);
  return players.find((player) => player.id === self.id);
}

export function useIsPlayerTargetable(playerId: string) {
  const currentGameState = useSelector(selectGameCurrentState);
  const self = useSelector(selectUser);
  if (currentGameState.type !== "TargetingState") return false;
  const currentPlayer = (currentGameState as TargetingState).currentPlayer;

  return self.id === currentPlayer.id && playerId !== currentPlayer.id;
}
