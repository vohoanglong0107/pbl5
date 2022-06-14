export const allTypeOfCards = [
  "Skip",
  "Attack",
  "See the future",
  "Draw from bottom",
  "Double Slap",
  "Defuse",
];

export interface CardSetting {
  name: string;
  number: number;
}

export const defaultCards: CardSetting[] = [
  {
    name: "Defuse",
    number: 8,
  },
  {
    name: "Explode",
    number: 8,
  },
  {
    name: "Skip",
    number: 4,
  },

  {
    name: "Attack",
    number: 4,
  },
];
