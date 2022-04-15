import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
}

export type Message = string;

export type Messages = Message[];

export type UserOnline = User & { self: boolean };

type UserState = User;

export type Users = UserOnline[];
type UsersState = Users;

type GameState = {
  id: string;
  players: User[];
  messages: Messages;
};

const userInitialState: UserState = {
  username: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    connect: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: [] as UsersState,
  reducers: {
    getUsers: (state, action: PayloadAction<{ users: Users; id: string }>) => {
      let { users, id } = action.payload;
      users = users.map((user) => {
        return { ...user, self: user.id === id };
      });
      return users;
    },
    userConnect: (state, action: PayloadAction<UserOnline>) => {
      return [...state, action.payload];
    },
  },
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: [] as Messages,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      return [...state, action.payload];
    },
  },
});

export const { getUsers, userConnect } = usersSlice.actions;
export const { addMessage } = messagesSlice.actions;

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    messages: messagesSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
