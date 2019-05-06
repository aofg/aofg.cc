import Vue from "vue";
import { Route } from "vue-router";
import { Store } from "vuex";
import VueI18n, { IVueI18n } from "./node_modules/vue-i18n";

declare module "*.vue" {
  const _default: Vue;
  export default _default;
}

interface INuxtContext {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  route: Route;
  store: Store<any>;
  env: object;
  query: object;
  nuxtState: object;
  req: Request;
  res: Response;
  redirect: (path: string) => void;
  error: (params: { statusCode?: string; message?: string }) => void;
  beforeNuxtRender: ({ Components, nuxtState }) => void;
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string | string[];
    fetch?: (context: INuxtContext) => void;
    asyncData?: (context: INuxtContext) => void;
    key?: (to: Route) => string;
    watchQuery?: string | string[];
  }
}

declare namespace NodeJS {
  export interface Process {
    client: boolean;
    server: boolean;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n | IVueI18n;
    md: markdownit
  }
}

declare global {
  interface Window {
  }
}
