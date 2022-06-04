import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ChatHistory } from "./ChatHistory"

type Chat = {
    username: string;
    msg: string;
}

// export const initialState = { chatHistory: [] }
export const initialState = { chatHistory: [] as Chat[] }


const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        chatUpdated(state, action: PayloadAction<Chat[]>) {

            state.chatHistory = action.payload;
            console.log("ACTIONNNN", action)
            // console.log("STATEEEEE", state)
            // return action.payload;
        },
    },
});

export default chatSlice;
export const { chatUpdated } = chatSlice.actions;
export const { reducer: chatReducer } = chatSlice;
export const selectChatHistory = (state: typeof initialState) => state.chatHistory;