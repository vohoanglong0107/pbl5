import { SocketHandler } from "@/handlers/Handler";
import registerConnectHandler from "./ConnectHandler";
import registerDisconnectHandler from "./DisconnectHandler";

const UserHandler: SocketHandler = (io, socket) => {
  registerConnectHandler(io, socket);
  registerDisconnectHandler(io, socket);
};

export default UserHandler;
