import cookie from "cookie";
import debugModule from "debug";
import { IncomingMessage } from "http";
import sessionStore from "./sessionStore";
import { COOKIE_NAME } from "@/constants";
const debug = debugModule("backend:cookie");

const registerCookie = (headers: any, req: IncomingMessage) => {
  if (req.headers.cookie) {
    let session = sessionStore.getSession(
      cookie.parse(req.headers.cookie)[COOKIE_NAME]
    );
    if (session) {
      const renewedCookie = cookie.serialize(COOKIE_NAME, session.id, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 1),
      });
      headers["Set-Cookie"] = renewedCookie;
      // for cookie to be able to be accessed later in connectHandler
      req.headers.cookie = renewedCookie;
      debug("send renewed cookie: ", renewedCookie);
      return;
    }
  }
  let sentCookie = cookie.parse(headers["Set-Cookie"][0]);
  let session = {
    id: sentCookie[COOKIE_NAME],
    userId: "",
    userName: "",
    expire: new Date(sentCookie["Expires"]),
  };
  sessionStore.setSession(session);
  // for cookie to be able to be accessed later in connectHandler
  req.headers.cookie = headers["Set-Cookie"][0];
  debug("send new cookie: ", sentCookie);
};
export default registerCookie;
