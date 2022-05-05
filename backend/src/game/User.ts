import { faker } from "@faker-js/faker";
import { SocketType } from "@/events";
import Player from "./Player";
import UserModel from "@/model/User";

export default class User {
  id: string;
  username: string;
  connections = new Map<string, SocketType>();
  player: Player | undefined;
  constructor(id: string, socket: SocketType) {
    this.id = id;
    this.username = faker.name.findName();
    this.addConnection(socket);
  }
  addConnection(socket: SocketType): void {
    this.connections.set(socket.id, socket);
    this.emit("connect", this.encode());
  }
  removeConnection(socket: SocketType): void {
    this.connections.delete(socket.id);
  }
  isDisconnected(): boolean {
    return this.connections.size === 0;
  }
  emit(event: string, ...data: any[]): void {
    event = `game:${event}`;
    for (let socket of this.connections.values()) {
      socket.emit(event, ...data);
    }
  }
  encode(): UserModel {
    return new UserModel(this.id, this.username);
  }
}
