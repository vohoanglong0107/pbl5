import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCreateGameMutation } from "@/components/game/gameSlice";

const CreateGame: NextPage = () => {
  const router = useRouter();

  const [createGame, createGameResponse] = useCreateGameMutation();

  useEffect(() => {
    createGame()
      .unwrap()
      .then(({ gameId }) => {
        router.push(`/games/${gameId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [createGameResponse.isError, router, createGame]);

  if (createGameResponse.isLoading || createGameResponse.isUninitialized)
    return (
      <div>
        <h1>Starting Game</h1>
      </div>
    );
  return null;
};

export default CreateGame;
