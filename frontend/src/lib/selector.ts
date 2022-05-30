import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { InGameState } from "@/components/game/GameState";
import gameSlice, {
  selectCurrentState,
  selectPlayers as _selectPlayers,
} from "@/components/game/gameSlice";
import settingSlice, {
  selectGameSetting as _selectGameSetting,
} from "@/components/setting/settingSlice";
import roomSlice, {
  selectConnectedUsers as _selectConnectedUsers,
} from "@/components/room/roomSlice";

export const selectGame = (state: RootState) => state[gameSlice.name];
export const selectSetting = (state: RootState) => state[settingSlice.name];
export const selectRoom = (state: RootState) => state[roomSlice.name];

export const selectGameCurrentState = createSelector(
  selectGame,
  selectCurrentState
);

export const selectPlayers = createSelector(selectGame, _selectPlayers);
export const selectGameSetting = createSelector(
  selectSetting,
  _selectGameSetting
);

export const selectConnectedUsers = createSelector(
  selectRoom,
  _selectConnectedUsers
);

export const selectDisCardPile = createSelector(
  selectGameCurrentState,
  (gameState) => {
    if (gameState.type === "IdleState" || gameState.type === "OverState")
      return [];
    else return (gameState as InGameState).gameEntity.discardPile;
  }
);
