<template>
  <ul v-bem>
    <li v-for="(step, index) in steps" :key="index" v-bem:item>
      <a href="#" v-bem:link>{{ step.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";

export interface IStepNode {
  title: string;
  url: string;
}

@Component({
  name: "el-breadcrumbs"
})
export default class Breadcrumbs extends Vue {
  @Prop({
    required: true
  })
  steps: Array<IStepNode>;
}
</script>
