import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import User from "./User";

type StateType = User | null;

const initialState: StateType = null as StateType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userConnected(state, action: PayloadAction<User>) {
      return action.payload;
    },
    usernameChanged(state, action: PayloadAction<string>) {
      state!.username = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { userConnected, usernameChanged } = userSlice.actions;
