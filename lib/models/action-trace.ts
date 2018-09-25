import { Hash, Name, AccountName, DateString, HexData } from './scalars';

export interface ActionTrace {
  receipt: {
    receiver: AccountName;
    act_digest: Hash;
    global_sequence: number;
    recv_sequence: number;
    auth_sequence: Array<[AccountName, number]>;
    code_sequence: number;
    abi_sequence: number;
  };
  act: {
    account: AccountName;
    name: Name;
    authorization: Array<{ actor: AccountName; permission: string }>;
    data: HexData;
  };
  elapsed: number;
  cpu_usage: number;
  console: string;
  total_cpu_usage: number;
  trx_id: Hash;
  createdAt: DateString;
}
