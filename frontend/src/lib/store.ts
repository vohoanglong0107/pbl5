import { gameSlice } from "@/components/game";
import userSlice from "@/components/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};

export const useGame = () => {
  const game = useSelector((state: RootState) => state.game);
  return game;
};
