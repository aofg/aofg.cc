<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        //- nuxt-link.button.is-light(to='/' :class="b('back')")
          span.icon.is-small
            i.mdi.mdi-arrow-left
        div(:class="b('header')")
          h2.is-size-4 
            span Holder 
            span.button.is-light
              hex-as-color(:hex="identity")
        div(:class="b('header')")
          .tile(v-if='account')
            .tile.is-child
              div
                h3.is-size-5 address
                span(style="font-style: monospace; font-size: 80%") {{account.address}}
            .tile.is-child
              div
                h3.is-size-5 Transactions
                span {{account.txCount}}
            .tile.is-child.is-hidden-touch
              div 
                h3.is-size-5 Incomings
                token-value(:value='account.incomingSum')
            .tile.is-child.is-hidden-touch
              div
                h3.is-size-5 Outgoins
                token-value(:value='account.outgoingSum')
            .tile.is-child
              div
                h3.is-size-5 Balance
                token-value(:value='account.balance')
        b-table(v-if='transfers' :data='transfers.events' :columns="columns" :loading='loading')
          template(slot-scope="scope")
            b-table-column(field="Sender")
              nuxt-link.button.is-small.is-light(v-if='scope.row.returnValues._from !== identity' :to='`/accounts/${scope.row.returnValues._from}`')
                hex-as-color(:hex="scope.row.returnValues._from")
              div(v-else)
                b-tag(type="success") self
                //- hex-as-color(:hex="scope.row.returnValues._from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(v-if='scope.row.returnValues._to !== identity' :to='`/accounts/${scope.row.returnValues._to}`')
                hex-as-color(:hex="scope.row.returnValues._to")
              div(v-else)
                b-tag(type="success") self
                //- hex-as-color(:hex="scope.row.returnValues._to")
            b-table-column(field="Amount")
              token-value(:value='scope.row.returnValues._value')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/tx/${scope.row.transactionHash}`')
                hex-as-color(:hex="scope.row.transactionHash")
            b-table-column(field="Time")
              b-tooltip(placement="is-top" type='is-light' :label="scope.row.timestamp | toJSTimestamp | dateShort")
                span(:class="b('date')") {{ scope.row.timestamp | toJSTimestamp | fromNow }}

        b-pagination(:class="b('pagination')" v-if='transfers && transfers.total > show'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import Async from "~/plugins/async-computed.plugin";
import axios from "axios";
import { distanceInWordsToNow, format } from "date-fns";

export interface EventModel {
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
  },
  mounted() {
    this.identity = this.$route.params.identity;
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
  identity: string = "";
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

  get offset(): number {
    return (this.page - 1) * this.show;
  }

  @Async(async function() {
    if (!this.identity) {
      return;
    }
    const { data } = await axios.get(
      `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/account/${
        this.identity
      }`
    );

    return data.data;
  })
  account: any;

  @Async(async function() {
    if (!this.identity) {
      return;
    }
    this.loading = true;
    const { data } = await axios.get(
      `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/events?` +
        `limit=${this.show}&` +
        `offset=${this.offset}&` +
        `involved=${this.identity}`
    );

    await new Promise(resolve => setTimeout(resolve, 350));
    console.log(data.data);
    this.loading = false;
    return data.data;
  })
  transfers: {
    total: number;
    events: EventModel[];
  } | null = null;
  defaultOpen: string[] = [];
}
</script>


<style lang="scss">
.page__header {
  .tile.is-child {
    flex-basis: auto;
  }
}
</style>
