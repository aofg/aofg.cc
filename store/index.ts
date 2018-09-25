import {} from "vuex-class";
import { Client } from "nes";
import { IStorageState, Nullable } from "~/types";

export type ActionContext<T> = {
  commit(mutation: string, payload: any);
  state: T;
};

export function state(): Nullable<IStorageState> {
  return {
    client: null,
    queue: []
  };
}

export class mutations {
  // static setNetwork(state: IStorageState, network: INetworkModel) {
  //   WebSocket;
  //   state.network = network;
  // }
  // static setNetworkEndpoint(state: IStorageState, endpoint: string) {
  //   state.networkEndpoint = endpoint;
  // }
  // static setIdentity(state: IStorageState, identity: IScatterIdentity) {
  //   state.identity = identity;
  // }
  static setSocket(state: IStorageState, socket: Client) {
    state.client = socket;
  }
  static receivedMessage(state: IStorageState, message: any) {
    state.queue.push(message);
    state.queue = state.queue.slice(-100);
  }
  static pushTx(state: IStorageState, tx: any) {
    state.queue.push(tx);
    state.queue = state.queue.slice(-100);
  }
}

export class actions {
  static async setupConnection(
    { commit, state }: ActionContext<IStorageState>,
    uri: string
  ) {
    if (state.client) {
      return state.client;
    }

    const socket = new Client(uri);
    const connection = await socket.connect();
    commit("setSocket", () => socket);

    return socket;
  }

  static async pushTransaction({ commit }, tx: any) {
    commit("pushTx", tx);
  }
  // static async setNetwork({ commit, state }, network: INetworkModel) {
  //   // get chain id
  //   commit("setNetwork", network);
  //   commit(
  //     "setNetworkEndpoint",
  //     `${network.protocol}://${network.host}:${network.port}`
  //   );
  //   commit("setIdentity", null);
  // }
  // static async setIdentity({ commit }, identity: IScatterIdentity) {
  //   commit("setIdentity", identity);
  // }
}
