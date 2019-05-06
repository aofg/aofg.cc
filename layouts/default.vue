<template>
  <section v-bem>
    <link
      rel="stylesheet"
      href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
    >
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/gvf5gpx.css">

  <!-- <div class="container mx-auto" style="display: none">
    <div class="row">
      <div class="col col-1 p-s" :key='i' v-for='i in 12'>
        <div class="bg-blue p-xs">{{ i }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-2 p-s" :key='i' v-for='i in 12'>
        <div class="bg-blue p-xs">{{ i }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-3 p-s" :key='i' v-for='i in 12'>
        <div class="bg-blue p-xs">{{ i }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-4 p-s" :key='i' v-for='i in 3'>
        <div class="bg-blue p-xs">{{ i }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-8 p-s" :key='i' v-for='i in 2'>
        <div class="bg-blue p-xs">{{ i }}</div>
      </div>
    </div>
  </div> -->

    <div v-bem:header class="container mx-auto">
      <img v-bem:logotype src="~/assets/images/logo-color.png" alt="">

      <nav v-bem:menu>
        <a href="/docs" v-bem:menu-item.active>Docs</a> 
        <a href="/blog" v-bem:menu-item>Blog</a> 
        <a href="/join" v-bem:menu-item>Participate</a> 
      </nav>


      <language-select v-bem:language-select />
    </div>

    <nuxt v-bem:content />
    
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import LanguageSelectVue from "../components/LanguageSelect.vue";

@Component({
  name: "layout",
  components: {
    "language-select": LanguageSelectVue
  }
})
export default class Layout extends Vue {
  @State locale: string;

  get modificators () {
    return {
      type: 'content-page'
    }
  }

}
</script>

<style>
</style>
