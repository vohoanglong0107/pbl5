import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GamePlay from "@/components/game/GamePlay";

const ConnectingPage = () => <h1>Getting room ID</h1>;

const Game: NextPage = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState<string | null>(null);
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      setGameId(gid);
    }
  }, [router]);
  if (!gameId) return <ConnectingPage />;
  return <GamePlay gameId={gameId} />;
};

export default Game;
