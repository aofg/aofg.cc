<template>
  <component :is="computedTag" v-bem>
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'el-text',
})
export default class extends Vue {
  @Prop({ default: 'span' })
  tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  @Prop({ default: false })
  color: false | 'green' | 'red' | 'dark' | 'darker' | 'white' | 'gray' | 'dark-grey';

  @Prop() shadow: boolean;
  @Prop() upper: boolean;
  @Prop() bold: boolean;
  @Prop() light: boolean;

  @Prop({ default: 'normal' })
  size: 'tiny' | 'small' | 'normal' | 'medium' | 'big' | 'huge';

  get computedTag() {
      return this.tag;
  }

  get modificators() {
    return {
      size: this.size,
      uppercase: this.upper,
      bold: this.bold,
      light: this.light,
      shadow: this.shadow,
      color: this.color,
    };
  }
}
</script>

<style lang='scss'>
.el-text {
    &--size {
        &-tiny {
            @apply text-xs;
        }
    }
}
</style>
