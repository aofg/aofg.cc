import { Hash, AccountName, DateString, Address } from './scalars';

export interface PubKey {
  _id: Hash;
  account: AccountName;
  permission: string;
  public_key: Address;
  createdAt: DateString;
}
