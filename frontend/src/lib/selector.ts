import chatSlice, {
  selectChatHistory as _selectChatHistory,
  selectSystemMessages as _selectSystemMessages,
} from "@/components/chat/chatSlice";
import gameSlice, {
  selectCurrentState,
  selectPlayers as _selectPlayers,
} from "@/components/game/gameSlice";
import { InGameState } from "@/components/game/GameState";
import roomSlice, {
  selectConnectedUsers as _selectConnectedUsers,
} from "@/components/room/roomSlice";
import settingSlice, {
  selectGameSetting as _selectGameSetting,
} from "@/components/setting/settingSlice";
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectGame = (state: RootState) => state[gameSlice.name];
export const selectSetting = (state: RootState) => state[settingSlice.name];
export const selectRoom = (state: RootState) => state[roomSlice.name];
export const selectChats = (state: RootState) => state[chatSlice.name];

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

export const selectChatHistory = createSelector(
  selectChats,
  _selectChatHistory
);

export const selectSystemMessages = createSelector(
  selectChats,
  _selectSystemMessages
);
