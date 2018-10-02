<template lang="pug">
  span(:class='b()')
    b-tooltip(placement="is-top" type='is-light' :label="full")
      span(:class='b("time")') {{ formated }}
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { format } from "date-fns";
import en from "date-fns/locale/en";
import ru from "date-fns/locale/ru";
import { State } from "vuex-class";

const locales = {
  en,
  ru
};

@Component({
  name: "date-time"
})
export default class extends Vue {
  @Prop({ required: true })
  time: string | number | Date;
  @State locale: string;

  get safeLocale() {
    return this.locale || "en";
  }

  get formated() {
    return format(this.time, "D MMM, HH:mm", {
      locale: locales[this.safeLocale]
    });
  }

  get full() {
    return format(this.time, "D MMMM YYYY, HH:mm", {
      locale: locales[this.safeLocale]
    });
  }
}
</script>

