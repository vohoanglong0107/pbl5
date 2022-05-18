import User from "@/components/user/User";

export default class Room {
  constructor(public id: string, public connectedUsers: User[]) {}
}
