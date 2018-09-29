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

      div(:class="b('menu')")
        nuxt-link.button.is-white(:to='`/${locale}/`') {{ $t('recent-transactions') }}
        nuxt-link.button.is-white(:to='`/${locale}/top`') {{ $t('top-holders') }}
        nuxt-link.button.is-white(:to='`/${locale}/coin`') {{ $t('coin-summary') }}
                
        language-select

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
}
</script>


<style lang="scss">
</style>