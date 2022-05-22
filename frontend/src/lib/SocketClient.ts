import { NEXT_PUBLIC_API_URL } from "@/constant";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  AckResponse,
} from "./events";

export default class SocketClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  constructor() {
    this.socket = io(NEXT_PUBLIC_API_URL, {
      autoConnect: false,
      withCredentials: true,
    });
    this.setUp();
  }
  connect(auth: any) {
    this.socket.auth = auth;
    this.socket.connect();
  }
  emit(event: string, ...args: any[]) {
    return new Promise((resolve, reject) => {
      this.socket
        .timeout(2000)
        .emit(event, ...args, (error: Error, response: AckResponse): void => {
          if (error) {
            reject(error.message);
          } else if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        });
    });
  }
  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }
  off(event: string, callback: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }
  setUp() {
    this.socket.on("connect", () => {});
    this.socket.on("connect_error", (err) => {
      alert("cant connect to server");
      console.log(err);
    });
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }
}

export const socketClient = new SocketClient();
