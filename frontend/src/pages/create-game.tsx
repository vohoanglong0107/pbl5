import LoadingPage from "@/components/loading/Page";
import { useCreateRoomMutation } from "@/components/room/roomSlice";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

const CreateGame: NextPage = () => {
  const router = useRouter();

  const [createGame, createGameResponse] = useCreateRoomMutation();
  const debouncedCreateGame = useMemo(
    () =>
      debounce(
        () =>
          createGame()
            .unwrap()
            .then(({ gameId }) => {
              router.push(`/games/${gameId}`);
            })
            .catch((error) => {
              console.log(error);
            }),
        5000
      ),
    [createGame, router]
  );

  useEffect(() => {
    debouncedCreateGame();
  }, [createGameResponse.isError, debouncedCreateGame]);

  if (
    createGameResponse.isLoading ||
    createGameResponse.isUninitialized ||
    createGameResponse.isError
  )
    return <LoadingPage pageName="Starting Game" />;
  return null;
};

export default CreateGame;
