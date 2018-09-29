<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        //- nuxt-link.button.is-light(to='/' :class="b('back')")
          span.icon.is-small
            i.mdi.mdi-arrow-left
        div(:class="b('header')")
          h2.is-size-4 
            span {{ $t('holder') }}
            span.button.is-light
              hex-as-color(:hex="identity")
        div(:class="b('header')")
          .tile(v-if='account')
            .tile.is-child
              div
                h3.is-size-5 {{ $t('address') }}
                span(style="font-style: monospace; font-size: 80%") {{account.address}}
            .tile.is-child
              div
                h3.is-size-5 {{ $t('transactions') }}
                span {{account.txCount}}
            .tile.is-child.is-hidden-touch
              div 
                h3.is-size-5 {{ $t('incomings') }}
                token-value(:value='account.incomingSum')
            .tile.is-child.is-hidden-touch
              div
                h3.is-size-5 {{ $t('outgoings') }}
                token-value(:value='account.outgoingSum')
            .tile.is-child
              div
                h3.is-size-5 {{ $t('balance') }}
                token-value(:value='account.balance')
        b-table(v-if='transfers' :data='transfers.events' :columns="columns" :loading='loading')
          template(slot-scope="scope")
            b-table-column(field="Sender")
              nuxt-link.button.is-small.is-light(v-if='scope.row.returnValues._from !== identity' :to="`/${locale}/accounts/${scope.row.returnValues._from}`")
                hex-as-color(:hex="scope.row.returnValues._from")
              div(v-else)
                b-tag(type="success") self
                //- hex-as-color(:hex="scope.row.returnValues._from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(v-if='scope.row.returnValues._to !== identity' :to="`/${locale}/accounts/${scope.row.returnValues._to}`")
                hex-as-color(:hex="scope.row.returnValues._to")
              div(v-else)
                b-tag(type="success") self
                //- hex-as-color(:hex="scope.row.returnValues._to")
            b-table-column(field="Amount")
              token-value(:value='scope.row.returnValues._value')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/tx/${scope.row.transactionHash}`')
                hex-as-color(:hex="scope.row.transactionHash")
            b-table-column(field="Time")
              from-now(:time="scope.row.timestamp | toJSTimestamp")

        b-pagination(:class="b('pagination')" v-if='transfers && transfers.total > show'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import FromNow from "~/components/FromNow.vue";
import { Async } from "~/plugins/async-computed.plugin";
import axios from "axios";
import { distanceInWordsToNow, format } from "date-fns";
import { State } from "vuex-class";

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
    "token-value": TokenValue,
    "from-now": FromNow
  },
  mounted() {
    this.identity = this.$route.params.identity;
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    }
  }
})
export default class extends Vue {
  @State locale;

  identity: string = "";
  page: number = 1;
  show: number = 15;

  get columns() {
    return [
      {
        label: this.$t("sender"),
        width: 150
      },
      {
        label: this.$t("recipient"),
        width: 150
      },
      {
        label: this.$t("amount"),
        width: 200
      },
      {
        label: this.$t("hash"),
        width: 150
      },
      {
        label: this.$t("age"),
        width: 120
      }
    ];
  }

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
