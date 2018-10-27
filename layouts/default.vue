<template lang="pug">
  section(:class="b()")
    link(rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css")
    link(href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i,800&amp;subset=cyrillic" rel="stylesheet")
    div.container(:class="b('header')")
      img(:class="b('logotype')" src="/MainCoin.png")
      nuxt-link(:class="b('brand')" :to="`/${locale}`")
        strong(:class="b('brand-main')") Maincoin 
        br
        span(:class="b('brand-second')") Explorer

      div(:class="b('menu')" :style="menuWrapperCSS")
        nuxt-link.button.is-white(:class="b('menu-link')" :to='`/${locale}/`') {{ $t('recent-transactions') }}
        nuxt-link.button.is-white(:class="b('menu-link')" :to='`/${locale}/top`') {{ $t('top-holders') }}
        nuxt-link.button.is-white(:class="b('menu-link')" :to='`/${locale}/coin`') {{ $t('coin-summary') }}
        language-select(:class="b('menu-link')")

      div(:class="b('search')")
        b-field(:type='validSearch ? "" : "is-danger"')
          b-input(:class="b('search-field')" type="text" v-model="searchString" :style="searchFieldCSS" @keyup.native.enter='trySearch' @keyup.native.escape='toggleSearch')
          p.control
            .button(v-if='!searchOpen' @click='toggleSearch')
              i.mdi.mdi-magnify
            .button(v-if='searchOpen && readyToSearch' @click='trySearch')
              i.mdi.mdi-magnify
            .button(v-if='searchOpen && !readyToSearch' @click='toggleSearch')
              i.mdi.mdi-close


    nuxt(:class="b('content')")

    footer.has-background-dark.has-text-primary(:class="b('footer')")
      .container
        p(:class="b('copy')") 
          span.has-text-light(style="opacity: 0.45") {{ $t('copyright-group') }} 
          strong.has-text-primary {{ $t('copyright-name') }}
        p(:class="b('copy')") 
          span.has-text-light(style="opacity: 0.45")  {{ $t('copyright-notice') }}
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import LanguageSelect from "~/components/LanguageSelect.vue";

@Component({
  name: "layout",
  components: {
    "language-select": LanguageSelect
  },
  async mounted(this: Layout) {}
})
export default class Layout extends Vue {
  @State locale: string;

  searchOpen: boolean = false;
  searchString: string = "";

  toggleSearch() {
    this.searchString = "";
    this.searchOpen = !this.searchOpen;
  }

  handleKey(event: KeyboardEvent) {
    console.log("test");
    console.log(event.keyCode, String.fromCharCode(event.keyCode));
  }

  trySearch() {
    if (this.readyToSearch) {
      (<any>this).$router.push(
        "/" +
          [
            this.locale,
            this.searchTx ? "tx" : "accounts",
            this.normalizedSearch
          ].join("/")
      );
      this.searchOpen = false;
      this.searchString = "";
    }
  }

  get searchFieldCSS() {
    return {
      // display: this.searchOpen ? 'block' : 'none'
      opacity: this.searchOpen ? 1 : 0,
      "max-width": this.searchOpen ? "1000px" : "0"
    };
  }

  get menuWrapperCSS() {
    return {
      overflow: "hidden",
      opacity: this.searchOpen ? 0 : 1,
      "max-width": this.searchOpen ? "0" : "1000px"
    };
  }

  get validSearch() {
    return this.readyToSearch && (this.searchTx || this.searchAddress);
  }

  get normalizedSearch() {
    return this.searchString.trim().toLowerCase();
  }

  get searchTx() {
    return !!this.normalizedSearch.match(/^0x([a-f0-9]{64})$/);
  }

  get searchAddress() {
    return !!this.normalizedSearch.match(/^0x([a-f0-9]{40})$/);
  }

  get readyToSearch() {
    return this.searchOpen && this.searchString.trim().length > 0;
  }

  get searchIcon() {
    if (this.searchOpen) {
      return this.validSearch ? "mdi-magnify" : "mdi-close-circle";
    } else {
      return "mdi-magnify";
    }
  }
}
</script>


<style lang="scss">
</style>