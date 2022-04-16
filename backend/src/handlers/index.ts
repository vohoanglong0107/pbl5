import { IOHandler } from "./Handler";
import registerCookieHandler from "./CookieHandler";
import registerConnectHandler from "./ConnectHandler";

const Handler: IOHandler = (io) => {
  registerCookieHandler(io);
  registerConnectHandler(io);
};

export default Handler;
