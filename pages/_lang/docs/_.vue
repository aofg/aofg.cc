<template>
  <div v-bem class="container mx-auto">
    <div v-bem:row class="row">
      <div v-bem:sidebar class="col-4">
        <el-navtree
          :tree="menu[locale].children"
          @section="selectSection"
          @page="openPage"
          :open="menuOpen"
          :page="menuPage"
        ></el-navtree>
        <!-- <el-navtree v-bem:side-nav :tree="nav" :active='active'></el-navtree> -->
      </div>
      <div v-bem:main class="col-8">
        <!-- <el-breadcrumbs :steps='breadcrumbs' /> -->
        <h1 v-bem:title>{{ page.title }}</h1>
        <p v-bem:meta>
          <span>last edited on March, 25 by</span>
          <a href="#">aofg</a>
        </p>
        <div v-bem:content.md class="md" v-html="content" ref="content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";
import axios from "axios";

@Component(<any>{
  name: "page",
  components: {},
  async asyncData({ $axios, params }) {
    const path = [params.lang, ...params["0"].split("/")];
    console.log(path);
    const { data: page } = await $axios.get(
      "http://localhost:4000/content/" + path.join("/")
    );
    const { data: menu } = await axios.get("http://localhost:4000/menu");
    return {
      page,
      menu
    };
  }
})
export default class extends Vue {
  @State locale: string;

  // async data fields
  menuOpen: any = null;
  menuPage: any = null;

  url: any = null;
  page: any = null;
  menu: any;

  path: string[];

  get content() {
    return (<any>this).$md.render(this.page.content);
  }

  openPage(page: any) {
    (this as any).$router.push(`/${this.locale}/docs/${page.path}`);
    // console.log(page)
  }
  selectSection(node: any) {
    this.menuOpen = node;
  }

  clickOnLink(event: MouseEvent) {
    console.log('clicked', event.target)

    const link = (event.target as HTMLLinkElement)
    const hrefAttr = link.getAttribute('href')
    if (hrefAttr.startsWith('/')) {
      // docs link
      const url = hrefAttr.slice(1).split('/')
      if (url[0] !== this.locale) {
        // TODO: Change locale
      }

      (this as any).$router.push(`/${this.locale}/docs/${url.slice(1).join('/')}`)
      event.preventDefault();
    } else if (hrefAttr.startsWith('#')) {
      // anchor!
    } else {
      const href = link.href;
      const url = new URL(href);
      if (url.origin === window.location.origin ){
        // local page (possible to route)
      } else {
      }
    }
  }

  mounted() {
    function traverse(node: any, path: string[]) {
      if (!path || path.length === 0) {
        return node;
      }

      return traverse(node.children[path[0]], path.slice(1));
    }

    const dirpath = this.page.path.slice(0, -1);
    const pageName = this.page.path[this.page.path.length - 1];
    const node = traverse(this.menu[this.locale], dirpath);
    this.menuPage = node.pages[pageName];

    console.log(
      Array.from((this.$refs.content as Element).querySelectorAll("a")).forEach(
        link => link.addEventListener("click", this.clickOnLink.bind(this))
      )
    );
  }
}
</script>