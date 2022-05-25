import Player from "../Player";
import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";

export default class Cat implements Command {
  constructor(
    public source: Player,
    public gameEntity: GameEntity,
    public target: Player
  ) {}
  execute(): Response {
    throw new Error("Not implemented");
  }
}
