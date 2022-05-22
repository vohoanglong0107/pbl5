import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RoomSetting from "./RoomSetting";

export const initialState: RoomSetting = {
  gameSetting: {
    maxPlayers: 8,
    turnTime: 10000,
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    settingUpdated(state, action: PayloadAction<RoomSetting>) {
      state = action.payload;
    },
  },
});

export default settingSlice;
export const { settingUpdated } = settingSlice.actions;
export const { reducer: settingReducer } = settingSlice;
export const selectGameSetting = (state: RoomSetting) => state.gameSetting;
