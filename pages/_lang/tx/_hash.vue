<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        div(:class="b('header')")
          h2.is-size-2
            span {{ $t('transaction') }} 

        div(:class="b('header')")
          .tile(v-if='log')
            .tile.is-child.tile-sender
              h3.is-size-5 
                span {{ $t('sender') }}
                nuxt-link.button.is-small.is-light(:to="`/${locale}/accounts/${from}`")
                  hex-as-color(:hex="from")
              span(style="font-style: monospace; font-size: 80%")  {{ from }}
            .tile.is-child.tile-amount
              h3.is-size-4
                token-value(:value='value')
            .tile.is-child.tile-recipient
              h3.is-size-5 
                span {{ $t('recipient') }}
                nuxt-link.button.is-small.is-light(:to="`/${locale}/accounts/${to}`")
                  hex-as-color(:hex="to")
              span(style="font-style: monospace; font-size: 80%") {{ to }}

        div(:class="b('header')")
          .tile(v-if='log').tiles-bottom
            .tile.is-child.tile-time.tile-bottom
              h3.is-size-6 
                span {{ $t('time') }}
              date-time(:time="tx.timestamp | toJSTimestamp")
            .tile.is-child.tile-block.tile-bottom
              h3.is-size-6 
                span {{ $t('status') }}
              span.icon.has-text-success
                i.mdi.mdi-check
              span Mined
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
import { Component, Vue, Prop } from "nuxt-property-decorator";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import Datetime from "~/components/Datetime.vue";
import { Async } from "~/plugins/async-computed.plugin";
import axios from "axios";
import { distanceInWordsToNow, format } from "date-fns";
import BN from "bn.js";
import { State } from "vuex-class";

@Component({
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
  }
})
export default class extends Vue {
  @State locale;

  hash: string = "";

  @Async(async function() {
    if (!this.hash) {
      return;
    }
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/tx/${this.hash}`
    );

    return data.data[0];
  })
  tx: any;

  get env() {
    return process.env;
  }

  get log() {
    if (this.tx && Array.isArray(this.tx.logs)) {
      return this.tx.logs.filter(
        log =>
          log.topics[0] ===
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      )[0];
    }

    return null;
  }

  get value() {
    if (this.log) {
      return new BN((this.log.data as string).slice(2), 16).toString(10);
    }

    return null;
  }

  get from() {
    if (this.log) {
      return "0x" + this.log.topics[1].slice(26);
    }
    return null;
  }

  get to() {
    if (this.log) {
      return "0x" + this.log.topics[2].slice(26);
    }
    return null;
  }

  get fee() {
    if (this.tx) {
      return new BN(this.tx.gasUsed).mul(new BN(this.tx.gasPrice)).toString(10);
    }
    return "0";
  }
}
</script>