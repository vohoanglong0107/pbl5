export default class Card {
  public readonly id: string;
  public commandId: number;
  constructor(id: string, commandId: number) {
    this.id = id;
    this.commandId = commandId;
  }
}
