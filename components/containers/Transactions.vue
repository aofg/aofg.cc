<template lang="pug">
  div(:class="b()")
    el-table(:class="b('table')" :data='transactions')
      el-table-column(label="Hash")
        template(slot-scope="scope")
          hex-as-color(:hex="scope.row.trx_id")
      el-table-column(label="Contract")
        template(slot-scope="scope")
          span {{scope.row.actions[0].account}}
      el-table-column(label="Method")
        template(slot-scope="scope")
          span {{scope.row.actions[0].name}}

</template>

<style lang="scss">
</style>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Transaction } from "~/lib/models";
import HexAsColorsVue from "~/components/HexAsColors.vue";

@Component({
  name: "el-transactions",
  components: {
    "hex-as-color": HexAsColorsVue
  }
})
export default class Transactions extends Vue {
  @Prop({ required: true })
  transactions: Transaction[];
}
</script>
