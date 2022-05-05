import GameModel from "@/model/Game";
import { XOR } from "@/util/type";

export interface Acknowledgement {
  (response: XOR<{ error: string }, { data: unknown }>): void;
}
