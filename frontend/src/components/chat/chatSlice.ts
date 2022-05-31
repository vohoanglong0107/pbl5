import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChatHistory from "./ChatHistory"

export const initialState: ChatHistory = { chats: [] }

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        settingUpdated(state, action: PayloadAction<ChatHistory>) {
            return action.payload;
        },
    },
});

export default chatSlice;
export const { settingUpdated } = chatSlice.actions;
export const { reducer: settingReducer } = chatSlice;
export const selectChatHistory = (state: ChatHistory) => state.chats;