import { selectGameCurrentState, selectPlayers } from "@/lib/selector";
import { selectUser } from "@/components/user/userSlice";
import { useSelector } from "react-redux";
import {
  PlayState,
  TargetingState,
  InGameState,
} from "@/components/game/GameState";
import { useGetUserQuery } from "@/components/user/userSlice";

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
  const currentPlayer = (currentGameState as InGameState).currentPlayer;
  return isGameInPlay && playerId === currentPlayer.id;
}

export function useSelfUser() {
  const userQueryResult = useGetUserQuery();
  const defaultUser = useSelector(selectUser);
  if (userQueryResult.isFetching) {
    return defaultUser;
  } else if (userQueryResult.isError) {
    throw userQueryResult.error;
  } else if (userQueryResult.isSuccess) {
    return userQueryResult.data;
  } else {
    throw new Error("Unexpected get user Query");
  }
}

export function useCanSelfPlay() {
  const currentGameState = useSelector(selectGameCurrentState);
  const self = useSelfUser();
  if (currentGameState.type !== "PlayState") return false;
  const currentPlayer = (currentGameState as PlayState).currentPlayer;
  return self.id === currentPlayer.id;
}

export function useSelfPlayer() {
  const players = useSelector(selectPlayers);
  const self = useSelfUser();
  return players.find((player) => player.id === self.id);
}

export function useIsPlayerTargetable(playerId: string) {
  const currentGameState = useSelector(selectGameCurrentState);
  const self = useSelfUser();
  if (currentGameState.type !== "TargetingState") return false;
  const currentPlayer = (currentGameState as TargetingState).currentPlayer;

  return self.id === currentPlayer.id && playerId !== currentPlayer.id;
}

export function useDeck() {
  const currentGameState = useSelector(selectGameCurrentState);
  if ("gameEntity" in currentGameState) {
    return (currentGameState as InGameState).gameEntity.deck;
  }
  return [];
}
