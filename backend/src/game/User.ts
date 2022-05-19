import { faker } from "@faker-js/faker";
import { SocketType } from "@/events";
import UserModel from "@/model/User";

export enum UserEvent {
  CONNECT = "user:connect",
}
export default class User {
  id: string;
  username: string;
  private connections = new Map<string, SocketType>();
  constructor(id: string, socket: SocketType) {
    this.id = id;
    this.username = faker.name.findName();
    this.addConnection(socket);
  }
  addConnection(socket: SocketType): void {
    this.connections.set(socket.id, socket);
    this.emit(UserEvent.CONNECT, this.encode());
  }
  removeConnection(socket: SocketType): void {
    this.connections.delete(socket.id);
  }
  isDisconnected(): boolean {
    return this.connections.size === 0;
  }
  emit(event: string, ...data: any[]): void {
    for (let socket of this.connections.values()) {
      socket.emit(event, ...data);
    }
  }
  encode(): UserModel {
    return new UserModel(this.id, this.username);
  }
}
