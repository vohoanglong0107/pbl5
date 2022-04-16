import { SocketHandler } from "@/handlers/Handler";
import registerStartGameHandler from "./StartGameHandler";
import registerUserHandler from "./user";

const GameHandler: SocketHandler = (io, socket) => {
  registerStartGameHandler(io, socket);
  registerUserHandler(io, socket);
};

export default GameHandler;
