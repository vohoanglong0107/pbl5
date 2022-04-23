import Card from "../card/Card";
import { User } from "../user";
export default interface Player extends User {
  hand: Card[];
}
