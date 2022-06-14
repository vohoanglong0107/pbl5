import { CardSetting } from "./CardSetting"

export default interface GameSetting {
  maxPlayers: number;
  turnTime: number;
  targetingTime: number;
  cardSetting: CardSetting[]
}
