import Card from "@/game/Card";

export default class Player {
  constructor(
    public id: string,
    public username: string,
    public hand: Card[],
    public exploded: boolean,
    public seat: number
  ) {}
}
