import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { socketClient } from "@/lib/SocketClient";
import RoomLayout from "@/components/room/RoomLayout";
import LoadingPage from "@/components/loading/Page";

const ConnectingPage = () => <LoadingPage pageName="Getting Room ID" />

const Game: NextPage = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState<string | null>(null);
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      setGameId(gid);
      socketClient.connect({
        gameId: gid,
      });
    }
  }, [router]);
  if (!gameId) return <ConnectingPage />;
  return <RoomLayout gameId={gameId} />;
};

export default Game;
