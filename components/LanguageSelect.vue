<template>
  <section v-bem>
    <nuxt-link :to="toRu">RU</nuxt-link>
    <nuxt-link :to="toEn">EN</nuxt-link>
  </section>
</template>

<script lang="ts">
//- <nuxt-link v-if="$i18n.locale === 'en'" :to="`/fr` + $route.fullPath" class="Header__Link" active-class="none" exact>
//-   {{ $t('links.french') }}
//- </nuxt-link>
//- <nuxt-link v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" class="Header__Link" active-class="none" exact>
//-   {{ $t('links.english') }}
//- </nuxt-link>

import { Vue, Component, Prop } from "nuxt-property-decorator";
import { State } from "vuex-class";

@Component({
  name: "language-select"
})
export default class extends Vue {
  @State locale: string;

  get isEn() {
    return this.locale === "en";
  }
  get isRu() {
    return this.locale === "ru";
  }

  get enClasses() {
    return this.isEn ? "is-primary is-selected" : "";
  }

  get ruClasses() {
    return this.isRu ? "is-primary is-selected" : "";
  }

  get localeLessPath() {
    return ((this as any).$route.fullPath as string).slice(3);
  }

  get toEn() {
    return `/en` + this.localeLessPath;
  }

  get toRu() {
    return `/ru` + this.localeLessPath;
  }
}
</script>

