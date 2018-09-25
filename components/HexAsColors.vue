<template lang="pug">
  div(:class='b()')
    b-tooltip(placement="is-top" type='is-light' :label="hex")
      span(:class="b('wrapper')")
        span(:class='b("head")' v-if='head') {{ extractedHead }}
        span(:class='b("part")' v-for="part in parts" :style="{ color: `#${part}` }")
        span(:class='b("tail")' v-if='tail') {{ extractedTail }}
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "hex-as-color"
})
export default class extends Vue {
  @Prop({ required: true })
  hex: string;

  @Prop({ default: 0 })
  head: number;
  @Prop({ default: 4 })
  tail: number;

  get extractedHead() {
    return this.normalized.slice(0, this.head);
  }

  get extractedTail() {
    return this.normalized.slice(-this.tail);
  }

  get normalized() {
    return this.hex.startsWith("0x") ? this.hex.slice(2) : this.hex;
  }

  get parts() {
    const parts = this.normalized.slice(this.head, -this.tail).match(/.{6}/g);
    return parts;
  }
}
</script>

