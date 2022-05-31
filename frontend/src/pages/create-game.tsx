import LoadingPage from "@/components/loading/Page";
import { useCreateRoomMutation } from "@/components/room/roomSlice";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";


const CreateGame: NextPage = () => {
  const router = useRouter();

  const [createGame, createGameResponse] = useCreateRoomMutation();

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
    <LoadingPage pageName="Starting Game"  />
  );
  return null;
};

export default CreateGame;
