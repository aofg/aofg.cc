<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        div(:class="b('header')")
          h2.is-size-2
            span {{ $t('transaction') }} 

        div(:class="b('header')" v-for='transfer in transfers')
          .tile
            .tile.is-child.tile-sender
              h3.is-size-5 
                span {{ $t('sender') }}
                nuxt-link.button.is-small.is-light(:to="`/${locale}/accounts/${transfer.from}`")
                  hex-as-color(:hex="transfer.from")
              span(style="font-style: monospace; font-size: 80%")  {{ transfer.from }}
            .tile.is-child.tile-amount
              h3.is-size-4
                token-value(:value='transfer.amount')
            .tile.is-child.tile-recipient
              h3.is-size-5 
                span {{ $t('recipient') }}
                nuxt-link.button.is-small.is-light(:to="`/${locale}/accounts/${transfer.to}`")
                  hex-as-color(:hex="transfer.to")
              span(style="font-style: monospace; font-size: 80%") {{ transfer.to }}

        div(:class="b('header')")
          .tile.tiles-bottom
            .tile.is-child.tile-time.tile-bottom
              h3.is-size-6 
                span {{ $t('time') }}
              date-time(:time="date | toJSTimestamp")
            .tile.is-child.tile-block.tile-bottom
              h3.is-size-6 
                span {{ $t('nonce') }}
              span {{ tx.nonce }}
            .tile.is-child.tile-block.tile-bottom
              div
                h3.is-size-6 {{ $t('fee') }}
                token-value(:value='fee' ticker="ETH")

            .tile.is-child.tile-signature.tile-bottom
              h3.is-size-6 
                span {{ $t('signature') }}
              hex-as-color(:hex="tx.r" :tail='0')
              hex-as-color(:hex="tx.s" :tail='0')
              span.icon.has-text-success
                i.mdi.mdi-check
              span Verified
            .tile.is-child.tile-hash.tile-bottom
              div
                h3.is-size-6 {{ $t('hash') }}
                span(style="font-style: monospace; font-size: 65%") {{tx.hash}}

</template>

<style lang="scss" scoped>
.tiles-bottom {
  flex-wrap: wrap;
  justify-content: space-between;
}
.tile-bottom {
  flex-grow: 0;
  flex-basis: auto;
  padding-right: 30px;

  &:last-child {
    padding-right: 0;
  }
}
.tile {
  &-sender {
    text-align: left;
  }
  &-amount {
    position: relative;
    text-align: center;
    background-color: #bca480;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    &::before,
    &::after {
      content: " ";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 35px solid transparent;
      border-left-width: 15px;
      border-right-width: 15px;
      border-left-color: #bca480;

      top: 50%;
    }

    &::before {
      left: 0;
      border-left-color: #ffffff;
      transform: translate(0, -50%);
    }

    &::after {
      right: 0;
      transform: translate(100%, -50%);
    }
  }
  &-recipient {
    text-align: right;
  }
}
</style>


<script lang="ts">
import _axios from "axios";
import https from "https";
const axios = _axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

import { Component, Vue, Prop } from "nuxt-property-decorator";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import Datetime from "~/components/Datetime.vue";
import { Async } from "~/plugins/async-computed.plugin";
import { distanceInWordsToNow, format } from "date-fns";
import BN from "bn.js";
import { State } from "vuex-class";

@Component(<any>{
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "date-time": Datetime,
    "token-value": TokenValue
  },
  mounted() {
    this.hash = this.$route.params.hash;
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    }
  },
  async asyncData({ route }) {
    if (route && route.params && route.params.hash) {
      console.log(route.params.hash);
    }
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/tx/${route.params.hash}`
    );

    console.assert(data.data.tx, "tx is required");
    console.assert(data.data.transfers, "tx is required");

    return {
      tx: data.data.tx,
      transfers: data.data.transfers
    };
  }
})
export default class extends Vue {
  @State locale;

  hash: string = "";

  tx: any;
  transfers: any[];

  get date() {
    return this.transfers[0].date;
  }

  get fee() {
    if (this.tx) {
      return new BN(this.tx.gasUsed).mul(new BN(this.tx.gasPrice)).toString(10);
    }
    return "0";
  }
}
</script>