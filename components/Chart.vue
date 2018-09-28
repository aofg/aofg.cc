<template lang="pug">
  div
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
export default class extends Vue {
  @Prop({
    required: true,
    type: Array,
    default: () => []
  })
  dataSets: any[];

  @Prop({
    required: true,
    type: Array,
    default: () => []
  })
  labels: any[];

  @Prop({
    required: false,
    type: String
  })
  title: string;

  @Prop({
    required: false,
    type: Number,
    default: 300
  })
  height: number;

  @Prop({
    required: false,
    type: String,
    default: "bar"
  })
  type: string;

  @Prop({
    required: false,
    type: Array,
    default: () => [
      {
        label: "Marker",
        value: 70,
        options: {
          labelPos: "left"
        }
      }
    ]
  })
  yMarkers: any[];

  @Prop({
    required: false,
    type: Array,
    default: () => [
      {
        label: "Region",
        start: -10,
        end: 50,
        options: {
          labelPos: "right"
        }
      }
    ]
  })
  yRegions: any[];

  @Prop({
    required: false,
    type: Array,
    default: () => ["purple", "#ffa3ef", "light-blue"]
  })
  colors: any[];

  @Prop({
    required: false,
    type: Boolean,
    default: false
  })
  isNavigable: boolean;

  @Prop({
    required: false,
    type: Boolean,
    default: false
  })
  valuesOverPoints: boolean;

  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {
        spaceRatio: 0.5,
        stacked: 0,
        height: 20,
        depth: 2
      };
    }
  })
  barOptions: any;

  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {
        dotSize: 4,
        hideLine: 0,
        hideDots: 0,
        heatline: 0,
        regionFill: 0,
        areaFill: 0
      };
    }
  })
  lineOptions: any;

  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {
        yAxisMode: "",
        xAxisMode: "",
        xIsSeries: 0
      };
    }
  })
  axisOptions: any;

  @Prop({
    required: false,
    type: Number,
    default: 20
  })
  maxLegendPoints: number;

  @Prop({
    required: false,
    type: Number,
    default: 20
  })
  maxSlices: number;

  @Prop({
    required: false,
    type: Boolean,
    default: true
  })
  discreteDomains: boolean;

  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {
        formatTooltipX: d => (d + "").toUpperCase(),
        formatTooltipY: d => d + " pts"
      };
    }
  })
  tooltipOptions: any;

  chart: any = null;
  data: any = {
    labels: this.labels,
    datasets: this.dataSets
  };

  mounted() {
    // if ((<any>process).browser) {
    //   this.startChart();
    // }
  }

  startChart() {
    this.chart = new Chart(this.$el, {
      data: this.data,
      type: this.type,
      title: this.title,
      colors: this.colors,
      height: this.height,
      tooltipOptions: this.tooltipOptions,
      isNavigable: this.isNavigable,
      valuesOverPoints: this.valuesOverPoints,
      barOptions: this.barOptions,
      lineOptions: this.lineOptions,
      axisOptions: this.axisOptions,
      maxLegendPoints: this.maxLegendPoints,
      maxSlices: this.maxSlices,
      discreteDomains: this.discreteDomains
    });
  }

  export() {
    this.chart.export();
  }

  addDataPoint(label, valueFromEachDataset, index) {
    this.chart.addDataPoint(label, valueFromEachDataset, index);
  }

  removeDataPoint(index) {
    this.chart.removeDataPoint(index);
  }

  updateDataset(datasetValues, index) {
    this.chart.updateDataset(datasetValues, index);
  }

  unbindWindowEvents() {
    this.chart.unbindWindowEvents();
  }
}
</script>

