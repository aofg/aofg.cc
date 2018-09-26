<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        div(:class="b('header')")
          h2.is-size-4 Recent transfers
          div(style="float: right")
            //- el-switch(v-model='skipEmpty')
        b-table(v-if='transfers && Array.isArray(transfers.events)' :data='transfers.events' @details-open="onDetails" :columns="columns" :loading='loading')
          template(slot-scope="scope")
            b-table-column(field="Sender")
              nuxt-link.button.is-small.is-light(:to='`/accounts/${scope.row.returnValues._from}`')
                hex-as-color(:hex="scope.row.returnValues._from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(:to='`/accounts/${scope.row.returnValues._to}`')
                hex-as-color(:hex="scope.row.returnValues._to")
            b-table-column(field="Amount")
              token-value(:value='scope.row.returnValues._value')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/tx/${scope.row.transactionHash}`')
                hex-as-color(:hex="scope.row.transactionHash")
            b-table-column(field="Time")
              b-tooltip(placement="is-top" type='is-light' :label="scope.row.timestamp | toJSTimestamp | dateShort")
                span(:class="b('date')") {{ scope.row.timestamp | toJSTimestamp | fromNow }}

        
        b-pagination(:class="b('pagination')" v-if='transfers'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
                      
</template>


<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";
import { Client } from "nes";

import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import smoothReflow from "vue-smooth-reflow";
import Async from "~/plugins/async-computed.plugin";
import axios from "axios";
import { distanceInWordsToNow, format } from "date-fns";

interface EventModel {
  id: string;
  timestamp: number;
  event: string;
  address: string;
  returnValues: any;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  raw?: { data: string; topics: string[] };
}

@Component({
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "token-value": TokenValue
    // "el-transactions": Transactions,
    // "el-contracts": Contracts
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    },
    dateShort(date: string | Date) {
      return format(date, "D MMM, HH:mm");
    },
    fromNow(date: string | Date) {
      return distanceInWordsToNow(date, {
        addSuffix: true,
        includeSeconds: true
      });
    },
    toValue(bn: string) {
      const s1 = bn.padStart(19, "0");
      return s1.slice(0, -18) + "." + s1.slice(-18, -14);
    }
  }
})
export default class extends Vue {
  @State client: () => Client;

  page: number = 1;
  show: number = 15;

  columns = [
    {
      label: "Sender",
      width: 150
    },
    {
      label: "Recipient",
      width: 150
    },
    {
      label: "Amount",
      width: 200
    },
    {
      label: "Hash",
      width: 150
    },
    {
      label: "Age",
      width: 120
    }
  ];

  loading: boolean = true;

  @Async(async function() {
    this.loading = true;
    const { data } = await axios.get(
      `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/events?limit=${
        this.show
      }&offset=${this.offset}`
    );

    await new Promise(resolve => setTimeout(resolve, 350));
    this.loading = false;
    return data.data;
  })
  transfers: {
    total: number;
    events: EventModel[];
  } | null = null;
  defaultOpen: string[] = [];

  get offset(): number {
    return (this.page - 1) * this.show;
  }

  onDetails(row, index) {}
}
</script>