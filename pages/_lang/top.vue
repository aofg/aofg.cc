<template lang="pug">
  div.container(:class="b()")
    div(:class="b('header')")
      h2.is-size-4 {{ $t('top-holders') }}
    
    b-table(v-if='loaded && Array.isArray(loaded.accounts)' :data='loaded.accounts' :columns="columns" :loading='loaded.loading')
      template(slot-scope="scope")
        b-table-column(field="Sender")
          nuxt-link.button.is-small.is-light(:to='`/${locale}/accounts/${scope.row.address}`')
            hex-as-color(:hex="scope.row.address")
        b-table-column(field="Amount")
          token-value(:value='scope.row.balance')
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
  @Async(async function() {
    // this.loaded.loading = true;
    const { data } = await axios.get(
      `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/top?limit=${
        this.show
      }&offset=${this.offset}`
    );

    await new Promise(resolve => setTimeout(resolve, 350));
    this.loaded = {
      ...this.loaded,
      ...data.data,
      loading: false,
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
    accounts: [],
    loading: true
  };
  get offset(): number {
    return (this.page - 1) * this.show;
  }
}
</script>
