<template lang="pug">
  div(:class="b()")
    div.container(:class="b('wrapper-disabled')")
      div(:class="b('header')")
        h2.is-size-4 
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
        .tile(ref="chartWrapper")
          no-ssr
            line-chart(:data='chartData' :options="chartOptions")
          //- no-ssr
            apexcharts(width="500" type="bar" :options="chartOptions" :series="series")
          //- vue-chart(
            elementId="test"
            :labels="[ '12am-3am', '3am-6am', '6am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm', '9pm-12am' ]"
            title="My Awesome Chart"
            type="axis-mixed"
            :height="300"
            :colors="['purple', '#ffa3ef', 'light-blue']"
            :dataSets="chartData")
          //- svg(:width="chartWidth" :height="chartHeight")
          //-   path(:d="activityGraph")
          //- div
            h3.is-size-5 Weekly activity 
            svg

</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { AxiosInstance } from "axios";
import { distanceInWordsToNow, format } from "date-fns";

@Component({
  name: "page",
  mounted() {
    this.chartRect = (this.$refs
      .chartWrapper as Element).getBoundingClientRect();
    this.fetchInfo();
  }
})
export default class extends Vue {
  chartOptions: any = { responsive: true, maintainAspectRatio: false };

  get chartData(): any {
    return {
      labels: this.activity.map(a => format(a.day * 1000, "D MMM")),
      datasets: [
        {
          label: "Transactions",
          backgroundColor: "#bca480",
          data: this.activity.map(a => a.count)
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

  async fetchInfo() {
    const { data } = await (<AxiosInstance>(<any>this).$axios).get(
      `${process.env.BACKEND_URL}/info`
    );

    console.log(data);

    this.activity = data.data.daysActivity;
    this.holdersCount = data.data.holdersCount;
  }
  // get dimensions () {
  //   return (this.$refs.chartWrapper as Element).getBoundingClientRect()
  // }
}
</script>

