interface CardSetting {
  name: string;
  number: number;
}

export default class GameSetting {
  maxPlayers: number = 8;
  turnTime: number = 20000;
  targetingTime: number = 15000;
  cardSetting: CardSetting[] = []
}
