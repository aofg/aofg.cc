import { AccountName, DateString } from './scalars';

export interface Account {
  name: AccountName;
  abi: any;
  createdAt: DateString;
}