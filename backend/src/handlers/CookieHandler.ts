import cookie from "cookie";
import debug from "debug";
import http from "http";
import { COOKIE_NAME } from "../contants";
import { IOHandler } from "./Handler";
import sessionStore, { Session } from "../sessionStore";

const debugLog = debug("backend:socket");

const CookieHandler: IOHandler = (io) => {
  const setCookieHandler = (headers: any, req: http.IncomingMessage) => {
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
        debugLog("send renewed cookie: ", renewedCookie);
        return;
      }
    }
    let sentCookie = cookie.parse(headers["Set-Cookie"][0]);
    let session: Session = {
      id: sentCookie[COOKIE_NAME],
      userId: "",
      userName: "",
      expire: new Date(sentCookie["Expires"]),
    };
    sessionStore.setSession(session);
    // for cookie to be able to be accessed later in connectHandler
    req.headers.cookie = headers["Set-Cookie"][0];
    debugLog("send new cookie: ", sentCookie);
  };
  io.engine.on("initial_headers", setCookieHandler);
};

export default CookieHandler;
