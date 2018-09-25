import {
  Hash,
  Name,
  AccountName,
  DateString,
  HexData,
  TransactionState
} from './scalars';

export interface TransactionTrace {
  id: Hash;
  receipt: {
    status: TransactionState;
    cpu_usage_us: number;
    net_usage_words: number;
  };
  elapsed: number;
  net_usage: number;
  scheduled: boolean;
  action_traces: Array<{
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
    inline_traces: any[];
  }>;
  except: any;
  createdAt: DateString;
}