<template>
  <section v-bem>
    <div>
      {{ locale }}
    </div>
    <div>
      {{ url }}
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";
import axios from "axios";

@Component(<any>{
  name: "page",
  components: {},
  async asyncData() {
    const response = await axios.get("http://localhost:4000/menu");
    return {
      raw: response.data
    };
  }
})
export default class extends Vue {
  @State locale: string;

  open: any = null;
  url: any = null;
  page: any = null;

  selectSection(node: any) {
    console.log(node);
    this.open = node;
  }

  openPage(page: any) {
    this.url = this.toURL(page.path);
    this.page = page;
  }

  toURL(url: string) {
    if (url.endsWith('index.md')) {
      url = url.slice(0, -"index.md".length);
    }

    return '/' + url;
  }
}
</script>