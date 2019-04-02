import Vue from "vue";

["Text", "Heading", "Navtree", "Breadcrumbs"].forEach(component => {
  const ctor = require(`../components/common/${component}.vue`).default;
  Vue.component((<any>ctor).options.name, ctor);
});
