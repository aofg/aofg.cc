<template lang="pug">
  span(:class='b()')
    span(:class='b("round")') {{ round }}
    span(:class='b("dot")') {{ dot }}
    span(:class='b("decimals")') {{ shownDecimals }}
    span(:class="b('ticker')") {{ ticker }}
</template>

<style lang="scss">
.token-value {
  // text-align: right;
  // display: flex;
  font-variant-numeric: tabular-nums;

  &__round {
    letter-spacing: -0.04em;
  }

  &__decimals {
    letter-spacing: -0.07em;
    font-size: 80%;
    opacity: 0.6;
  }

  &__ticker {
    width: 60px;
    letter-spacing: -0.07em;
    text-align: left;
    margin-left: 0.45em;
  }
}
</style>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "token-value"
})
export default class extends Vue {
  @Prop({ required: true })
  value: string;

  @Prop({ default: "MNC" })
  ticker: string;

  @Prop({ default: 18 })
  decimals: number;

  @Prop({ default: 4 })
  showDecimals: number;

  @Prop({ default: "." })
  dot: string;

  @Prop({ default: false })
  delimited: string;

  get normalized() {
    return (this.value || "0").toString().padStart(19, "0");
  }
  get fullDecimals() {
    return this.normalized.slice(-18);
  }

  get shownDecimals() {
    return this.fullDecimals.slice(0, this.showDecimals);
  }

  get round() {
    return this.normalized.slice(0, -18);
  }
}
</script>

