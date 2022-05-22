import { CardCommands } from "./CardCommands";

export interface Response {
  type: CardCommands;
  data?: unknown;
}

export default interface Command {
  execute(): Response;
}
