<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        div(:class="b('header')")
          h2.is-size-4 {{ $t('recent-transactions') }}
          div(style="float: right")
            //- el-switch(v-model='skipEmpty')
        b-table(v-if='transfers && Array.isArray(transfers.events)' :data='transfers.events' @details-open="onDetails" :columns="columns" :loading='loading')
          template(slot-scope="scope")
            b-table-column(field="Sender")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.returnValues._from}`')
                hex-as-color(:hex="scope.row.returnValues._from")
            b-table-column(field="Recipient")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.returnValues._to}`')
                hex-as-color(:hex="scope.row.returnValues._to")
            b-table-column(field="Amount")
              token-value(:value='scope.row.returnValues._value')
            b-table-column(field="Transaction")
              nuxt-link.button.is-small.is-light(:to='`/${locale}/tx/${scope.row.transactionHash}`')
                hex-as-color(:hex="scope.row.transactionHash")
            b-table-column(field="Time")
              from-now(:time="scope.row.timestamp | toJSTimestamp")
        
        b-pagination(:class="b('pagination')" v-if='transfers'
                     :total='transfers.total'
                     :current.sync='page'
                     :per-page='show')
                      
</template>


<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";

import HexAsColors from "~/components/HexAsColors.vue";
import FromNow from "~/components/FromNow.vue";
import TokenValue from "~/components/TokenValue.vue";
import { Async } from "~/plugins/async-computed.plugin";
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
    "token-value": TokenValue,
    "from-now": FromNow
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    }
  }
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

  loading: boolean = true;

  @Async(async function() {
    this.loading = true;
    console.log(
      "load recent",
      `${process.env.BACKEND_URL}`
    );
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/events?limit=${
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