<template lang="pug">
    div(:class="b()")
      div.container(:class="b('wrapper-disabled')")
        //- nuxt-link.button.is-light(to='/' :class="b('back')")
          span.icon.is-small
            i.mdi.mdi-arrow-left
        div(:class="b('header')")
          h2.is-size-4 
            span Transaction

      div.container(:class="b('wrapper-disabled')")
        pre {{ env }}
      //- div.container(:class="b('wrapper-disabled')")
        pre {{ tx }}
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import HexAsColors from "~/components/HexAsColors.vue";
import TokenValue from "~/components/TokenValue.vue";
import { Async } from "~/plugins/async-computed.plugin";
import axios from "axios";
import { distanceInWordsToNow, format } from "date-fns";

@Component({
  name: "page",
  components: {
    "hex-as-color": HexAsColors,
    "token-value": TokenValue
  },
  mounted() {
    this.hash = this.$route.params.hash;
  },
  filters: {
    toJSTimestamp(unix: number) {
      return new Date(unix * 1000);
    },
    dateShort(date: string | Date) {
      return format(date, "D MMM, HH:mm");
    },
    fromNow(date: string | Date) {
      return distanceInWordsToNow(date, {
        addSuffix: true,
        includeSeconds: true
      });
    }
  }
})
export default class extends Vue {
  hash: string = "";

  @Async(async function() {
    if (!this.hash) {
      return;
    }
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/tx/${this.hash}`
    );

    return data.data;
  })
  tx: any;

  get env() {
    return process.env;
  }
}
</script>