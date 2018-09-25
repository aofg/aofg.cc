import { Client } from "nes";
export type Nullable<T> = { [P in keyof T]: T[P] | null };

export interface IStorageState {
  client: Client;
  queue: any[];
}
