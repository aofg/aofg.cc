import { Hash, AccountName, DateString, Signature } from "./scalars";

export interface Block {
  block_id: Hash;
  block: {
    timestamp: DateString;
    producer: AccountName;
    confirmed: number;
    previous: Hash;
    transaction_mroot: Hash;
    action_mroot: Hash;
    schedule_version: 0;
    new_producers: null;
    header_extensions: any[];
    producer_signature: Signature;
    transactions: any[];
    block_extensions: any[];
  };

  block_num: number;
  createdAt: DateString;
  in_current_chain: boolean;
  irreversible: boolean;
  updatedAt: DateString;
  validated: boolean;
}
