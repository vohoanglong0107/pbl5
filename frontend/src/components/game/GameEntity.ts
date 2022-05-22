import Card from "@/components/card/Card";

export default interface GameEntity {
  deck: Card[];
  discardPile: Card[];
  currentPlayerNumberOfTurns: number;
  direction: number;
}
