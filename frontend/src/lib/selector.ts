import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import gameSlice, {
  selectCurrentState,
  selectPlayers as _selectPlayers,
} from "@/components/game/gameSlice";
import settingSlice, {
  selectGameSetting as _selectGameSetting,
} from "@/components/setting/settingSlice";

export const selectGame = (state: RootState) => state[gameSlice.name];
export const selectSetting = (state: RootState) => state[settingSlice.name];

export const selectGameCurrentState = createSelector(
  selectGame,
  selectCurrentState
);

export const selectPlayers = createSelector(selectGame, _selectPlayers);
export const selectGameSetting = createSelector(
  selectSetting,
  _selectGameSetting
);
