<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        //- nuxt-link.button.is-light(to='/' :class="b('back')")
          span.icon.is-small
            i.mdi.mdi-arrow-left
        div(:class="b('header')")
          h2.is-size-2
            span {{ $t('holder') }}
            span.button.is-light.is-large
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
                span(v-if='transfers') {{ transfers.total }}
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
              nuxt-link.button.is-small.is-light(v-if='scope.row.from !== identity' :to="`/${locale}/accounts/${scope.row.from}`")
                hex-as-color(:hex="scope.row.from")
              div(v-else)
                b-tag(type="success") self
                //- hex-as-color(:hex="scope.row.from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(v-if='scope.row.to !== identity' :to="`/${locale}/accounts/${scope.row.to}`")
                hex-as-color(:hex="scope.row.to")
              div(v-else)
                b-tag(type="success") self
            b-table-column(field="Amount")
              token-value(:value='scope.row.amount')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/tx/${scope.row.txHash}`')
                hex-as-color(:hex="scope.row.txHash")
            b-table-column(field="Time")
              from-now(:time="scope.row.date | toJSTimestamp")

        b-pagination(:class="b('pagination')" v-if='transfers && transfers.total > show'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
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

@Component(<any>{
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "token-value": TokenValue,
    "from-now": FromNow
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    }
  },
  async asyncData({ route, app }) {
    const { params, query } = route;
    console.log(route.query);

    query.show = parseInt(query.show || "15");
    query.page = parseInt(query.page || "1");

    const { data } = await axios.get(
      `${app.$env.BACKEND_URL}/holder/${params.identity}?limit=${
        query.show
      }&page=${query.page}`
    );

    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      identity: params.identity,
      account: data.data.holder,
      transfers: {
        events: data.data.transfers,
        total: data.data.total
      },
      show: query.show,
      page: query.page,
      loading: false
    };
  },
  watchQuery: ["page", "show"]
})
export default class extends Vue {
  @State locale;

  loading: boolean = false;
  indentity: string = "0x0";
  page: number = 1;
  show: number = 15;
  account: any = {};
  transfers: {
    total: number;
    events: EventModel[];
  } | null = null;
  defaultOpen: string[] = [];

  @Watch("page")
  @Watch("show")
  onPagination() {
    this.loading = true;
    (<any>this).$router.push({
      query: {
        show: this.show,
        page: this.page
      }
    });
  }

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
}
</script>


<style lang="scss">
.page__header {
  .tile.is-child {
    flex-basis: auto;
  }
}
</style>
