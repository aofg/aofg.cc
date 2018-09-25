<template lang="pug">
  div(:class="b()")
    el-table(:class="b('table')" :data='list')
      el-table-column(label="Name")
        template(slot-scope="scope")
          span {{ scope.row.name }}
      el-table-column(label="Created")
        template(slot-scope="scope")
          span {{ scope.row.createdAt | fromNow }}
      el-table-column(label="" width="55px")
        template(slot-scope="scope")
          el-button(type="primary" :plain="true" :circle="true" size="small" icon="el-icon-search")

</template>

<style lang="scss">
</style>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Account } from "~/lib/models";
import HexAsColorsVue from "~/components/HexAsColors.vue";
import { distanceInWordsToNow } from 'date-fns'

@Component({
  name: "el-contracts",
  components: {
    "hex-as-color": HexAsColorsVue
  },
  filters: {
    fromNow(date: string | Date) {
      return distanceInWordsToNow(date, { addSuffix: true })
    }
  }
})
export default class Contracts extends Vue {
  @Prop({ required: true })
  list: Account[];
}
</script>
