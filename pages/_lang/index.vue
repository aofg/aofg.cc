<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        div(:class="b('header')")
          h2.is-size-2 {{ $t('recent-transactions') }}
          div(style="float: right")
            //- el-switch(v-model='skipEmpty')
        b-table(v-if='transfers && Array.isArray(transfers.events)' :data='transfers.events' @details-open="onDetails" :columns="columns" :loading='loading')
          template(slot-scope="scope")
            b-table-column(field="Sender")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.from}`')
                hex-as-color(:hex="scope.row.from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.to}`')
                hex-as-color(:hex="scope.row.to")
            b-table-column(field="Amount")
              token-value(:value='scope.row.amount')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/tx/${scope.row.txHash}`')
                hex-as-color(:hex="scope.row.txHash")
            b-table-column(field="Time")
              from-now(:time="scope.row.date | toJSTimestamp")
        
        b-pagination(:class="b('pagination')" v-if='transfers'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
                      
</template>


<script lang="ts">
import axios from "axios";
import https from "https";
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";

import HexAsColors from "~/components/HexAsColors.vue";
import FromNow from "~/components/FromNow.vue";
import TokenValue from "~/components/TokenValue.vue";
import { Async } from "~/plugins/async-computed.plugin";
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
  async asyncData({ route }) {
    const { params, query } = route;
    console.log(route.query);

    query.show = parseInt(query.show || "15");
    query.page = parseInt(query.page || "1");

    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/txs?limit=${query.show}&page=${query.page}`
    );

    console.assert(data.data, "transfers array is required");

    return {
      transfers: data.data,
      show: query.show,
      page: query.page,
      loading: false
    };
  },
  watchQuery: ["page", "show"]
})
export default class extends Vue {
  @State locale: string;

  page: number = 1;
  show: number = 15;

  get columns() {
    // hook on locale changes :)
    if (this.locale) {
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
    return [];
  }

  @Watch("page")
  @Watch("show")
  onPagination() {
    this.loading = true;
    (<any>this).$router.push({
      to: "/",
      query: {
        show: this.show,
        page: this.page
      }
    });
  }

  loading: boolean = false;

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