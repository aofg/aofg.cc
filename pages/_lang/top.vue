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
import { State } from "vuex-class";
import { Component, Vue } from "nuxt-property-decorator";
import { Async } from "~/plugins/async-computed.plugin";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";

@Component({
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "token-value": TokenValue
  }
})
export default class extends Vue {
  @State locale;
  show: number = 15;
  page: number = 1;
  loading: boolean = true;
  @Async(async function() {
    this.loading = true;
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/top?limit=${this.show}&offset=${this.offset}`
    );

    this.loading = false;
    this.loaded = {
      ...data.data,
      test: "test"
    };

    return data;
  })
  tmpLoaded: any;

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
  get offset(): number {
    return (this.page - 1) * this.show;
  }
}
</script>
