<template lang="pug">
  div.container(:class="b()")
    div(:class="b('header')")
      h2.is-size-2 {{ $t('top-holders') }}
    
    b-table(v-if='loaded && Array.isArray(loaded.accounts)' :data='loaded.accounts' :columns="columns" :loading='loading')
      template(slot-scope="scope")
        b-table-column(field="Sender")
          nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.address}`')
            hex-as-color(:hex="scope.row.address")
        b-table-column(field="Amount")
          token-value(:value='scope.row.balance')


    b-pagination(:class="b('pagination')" v-if='loaded'
                  :total='loaded.total'
                  :current.sync='page'
                  :per-page='show')
</template>

<script lang="ts">
import axios from "axios";
import https from "https";
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

import { State } from "vuex-class";
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { Async } from "~/plugins/async-computed.plugin";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import bn from "bn.js";

@Component(<any>{
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "token-value": TokenValue
  },
  async asyncData({ route }) {
    const { params, query } = route;
    console.log(route.query);

    query.show = parseInt(query.show || "15");
    query.page = parseInt(query.page || "1");

    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/top?limit=${query.show}&page=${query.page}`
    );

    console.assert(data.data.holders, "holders list is required");

    return {
      loaded: {
        accounts: data.data.holders,
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
  show: number = 15;
  page: number = 1;
  loading: boolean = true;
  // @Async(async function() {
  //   this.loading = true;
  //   const { data } = await axios.get(
  //     `${process.env.BACKEND_URL}/top?limit=${this.show}&offset=${this.offset}`
  //   );

  //   this.loading = false;
  //   this.loaded = {
  //     ...data.data,
  //     test: "test"
  //   };

  //   return data;
  // })
  // tmpLoaded: any;

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
        label: this.$t("address")
      },
      {
        label: this.$t("balance")
      }
    ];
  }

  loaded: any = {
    accounts: []
  };
}
</script>
