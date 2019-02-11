<template lang="pug">
  div(:class="b()")
    div.container(:class="b('wrapper-disabled')")
      div(:class="b('header')")
        h2.is-size-2
          strong Maincoin 
          span &ndash; это цифровая наличность, доступная для вас в любой точке мира

      .tile
        .tile
          div
            h3.is-size-5 Specification 
            table.table
              thead
                tr
                  th Name
                  th Description
                tr
                  td Company name
                  td MainCoin
                tr 
                  td Website
                  td
                    a(href="https://maincoin.money/") https://maincoin.money/
                tr
                  td Token Name
                  td MainCoin
                tr
                  td Token Type
                  td Token implements ERC20 and Burnable interfaces
                tr 
                  td Underlying Blockchain
                  td Ethereum network
                tr
                  td Token Symbol
                  td MNC
                tr
                  td Smart-contract
                  td 0x9f0f1be08591ab7d990faf910b38ed5d60e4d5bf
                tr 
                  td Total supply
                  td 500,000,000 MNC are issued initially and limited forever.
                tr
                  td Holders count
                  td 
                    nuxt-link(:to="`/${locale}/top`")
                      span {{ holdersCount }}
        .tile(ref="chartWrapper")
          no-ssr
            line-chart(:data='chartData' :options="chartOptions")

</template>

<script lang="ts">
import axios from "axios";
import https from "https";
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

import { Vue, Component } from "nuxt-property-decorator";
import { AxiosInstance } from "axios";
import { distanceInWordsToNow, format } from "date-fns";
import { State } from "vuex-class";

@Component(<any>{
  name: "page",
  mounted() {
    this.chartRect = (this.$refs
      .chartWrapper as Element).getBoundingClientRect();
  },
  async asyncData(ctx) {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/info`);

    console.log(data);

    return {
      activity: data.data.daysActivity,
      holdersCount: data.data.holdersCount
    };
  }
})
export default class extends Vue {
  @State locale;
  chartOptions: any = { responsive: true, maintainAspectRatio: false };

  get chartData(): any {
    return {
      labels: (this.activity || []).map(a => format(a.day * 1000, "D MMM")),
      datasets: [
        {
          label: "Transactions",
          backgroundColor: "#bca480",
          data: (this.activity || []).map(a => a.count)
        }
      ]
    };
  }

  chartRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };

  browser: boolean = false;

  activity: Array<{
    day: number;
    count: number;
  }> = [];

  holdersCount: number = 0;

  get chartWidth() {
    return this.chartRect.width;
  }

  get chartHeight() {
    return this.chartRect.height;
  }

  get activityGraph() {
    return "M0 0 H 100 V 100 H 0 Z";
  }
}
</script>

