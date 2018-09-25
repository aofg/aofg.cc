import { Hash, Name, AccountName, DateString, HexData } from './scalars';

export interface Transaction {
  trx_id: Hash;
  accepted: boolean;
  actions: Array<{
    account: AccountName;
    name: Name;
    authorization: Array<{ actor: AccountName; permission: string }>;
    data: HexData;
  }>;
  context_free_actions: any[];
  context_free_data: any[];
  createdAt: DateString;
  delay_sec: number;
  expiration: DateString;
  implicit: boolean;
  max_cpu_usage_ms: number;
  max_net_usage_words: number;
  ref_block_num: number;
  ref_block_prefix: string;
  scheduled: false;
  signatures: any[];
  transaction_extensions: any[];
}
