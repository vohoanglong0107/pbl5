import { NextPage } from "next";
import { useState, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/router";

const CreateGame: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/create-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        router.push(`/games/${data.gameId}`);
      });
  }, []);
  return (
    <div>
      <h1>Starting Game</h1>
    </div>
  );
};

export default CreateGame;
