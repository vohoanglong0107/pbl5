import { SocketHandler } from "@/handlers/Handler";
import registerConnectHandler from "./ConnectHandler";
import registerDisconnectHandler from "./DisconnectHandler";
import registerTakeSlotHandler from "./TakeSlotHandler";
import registerDrawCardHandler from "./DrawCardHandler";

const UserHandler: SocketHandler = (io, socket) => {
  registerConnectHandler(io, socket);
  registerDisconnectHandler(io, socket);
  registerTakeSlotHandler(io, socket);
  registerDrawCardHandler(io, socket);
};

export default UserHandler;
