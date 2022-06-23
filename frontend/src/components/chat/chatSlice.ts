import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, SystemMessage } from "./ChatHistory";

export interface State {
  chatHistory: Chat[];
  systemMessages: SystemMessage[];
}

export const initialState: State = {
  chatHistory: [],
  systemMessages: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatUpdated(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default chatSlice;
export const { chatUpdated } = chatSlice.actions;
export const { reducer: chatReducer } = chatSlice;
export const selectChatHistory = (state: typeof initialState) =>
  state.chatHistory;
export const selectSystemMessages = (state: typeof initialState) =>
  state.systemMessages;
