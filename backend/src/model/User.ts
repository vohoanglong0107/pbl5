import User from "@/game/User";

export default class UserModel {
  id: string;
  username: string;
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }
}
