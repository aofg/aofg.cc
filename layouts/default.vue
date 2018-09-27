<template lang="pug">
  section(:class="b()")
    link(rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css")
    link(href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i,800&amp;subset=cyrillic" rel="stylesheet")
    div.container(:class="b('header')")
      img(:class="b('logotype')" src="/MainCoin.png")
      nuxt-link(:class="b('brand')" to="/")
        strong(:class="b('brand-main')") Maincoin 
        br
        span(:class="b('brand-second')") Explorer

      div(:class="b('menu')")
        nuxt-link.button.is-white(to='/') Recent transactions
        nuxt-link.button.is-white(to='/top') Top holders
        nuxt-link.button.is-white(to='/coin') Coin summary
    //- el-menu.el-menu-demo(:class='b("menu")' mode="horizontal" :router="true")
      el-menu-item(index='deploy' :route="{ path: '/' }") Overview

    nuxt(:class="b('content')")

    footer.has-background-dark.has-text-primary(:class="b('footer')")
      .container
        p(:class="b('copy')") 
          span.has-text-light(style="opacity: 0.45") ГРУППА КОМПАНИЙ 
          strong.has-text-primary «АВТОМАЙН ХОЛДИНГ»
        p(:class="b('copy')") 
          span.has-text-light(style="opacity: 0.45") © all rights reserved maincoin.money.com
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "layout",
  async mounted(this: Layout) {
  }
})
export default class Layout extends Vue {
}
</script>


<style lang="scss">
</style>