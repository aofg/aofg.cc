<template>
  <div v-bem v-html="rendered"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  name: "el-markdown"
})
export default class MarkdownIt extends Vue {
  @Prop({
    required: true
  })
  raw: string;

  get rendered() {
    // if (!this.$isServer) {
    return this.md.render(this.raw);
    // } else {
    //   return "test";
    // }
  }
}
</script>

