export default class Card {
  public readonly id: number;
  public commandId: number;
  constructor(id: number, commandId: number) {
    this.id = id;
    this.commandId = commandId;
  }
}
