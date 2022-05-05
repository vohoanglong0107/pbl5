export interface EventsMap {
  [event: string]: any;
}

export type EventNames<Map extends EventsMap> = keyof Map & (string | symbol);
export type EventParams<
  Map extends EventsMap,
  Ev extends EventNames<Map>
> = Parameters<Map[Ev]>;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
