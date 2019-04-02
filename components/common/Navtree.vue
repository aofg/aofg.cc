<template>
  <ul v-bem>
    <li v-for="(item, index) in tree" :key="index" v-bem:item :mods="{ open: isOpenAncestor(item), page: isPageAncestor(item) }">
      <a
        href="#"
        v-bem:link
        :mods="{ open: isOpenAncestor(item), page: isPageAncestor(item) }" 
        @click.prevent="$emit('section', item)"
      >{{ item.title }}</a>
      <template v-bem:nested v-if="item.children && (isOpenAncestor(item) || isPageAncestor(item))">
        <el-navtree
          :tree="item.children"
          :level="level + 1"
          :open="open"
          :page="page"
          @section="$emit('section', $event)"
          @page="$emit('page', $event)"
        />
      </template>

      <ul v-bem:pages v-if="item.pages && (isOpenAncestor(item) || isPageAncestor(item)) ">
        <li v-bem:page v-for="(p, path) in item.pages" :key="path">
          <a :href="toURL(p.path)" v-bem:link.leaf @click.prevent="$emit('page', p)" :mods='{ page: page === p }'>{{ p.title }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";

export interface IContent {
  title: string;
  breadcrumbs: string;
  description?: string;
}

export interface ITreeNode extends IContent {
  children?: {
    [key: string]: ITreeNode;
  };
  pages?: {
    [key: string]: IContent;
  };
}

@Component({
  name: "el-navtree"
})
export default class Navtree extends Vue {
  @Prop({
    default: 0
  })
  level: number;

  @Prop({
    required: true
  })
  tree: Array<ITreeNode>;

  @Prop({
    required: false
  })
  page?: IContent;

  @Prop({
    required: false
  })
  open?: ITreeNode;

  isPageAncestor(node: ITreeNode) {
    function findPageInDescendant(n: ITreeNode, find: IContent) {
      if (n.pages) {
        if (Object.values(n.pages).includes(find)) {
          return true;
        }
      }

      if (n.children) {
        for (const child of Object.values(n.children)) {
          if (findPageInDescendant(child, find)) {
            return true;
          }
        }
      }

      return false;
    }

    return findPageInDescendant(node, this.page);
  }

  isOpenAncestor(node: ITreeNode) {
    function findInDescendant(n: ITreeNode, find: ITreeNode) {
      if (n === find) {
        return true;
      }

      if (n.children) {
        for (const child of Object.values(n.children)) {
          if (findInDescendant(child, find)) {
            return true;
          }
        }
      }

      return false;
    }

    return findInDescendant(node, this.open);
  }

  toURL(url: string) {
    if (url.endsWith('index')) {
      url = url.slice(0, -"index".length);
    }

    return '/' + url;
  }

  // isOpenAncestor(node: ITreeNode) {
  //   if (!this.open && !this.page) {
  //     return false;
  //   }

  //   return (
  //     findInDescendant(node, this.open) || findPageInDescendant(node, this.page)
  //   );
  // }

  get modificators() {
    return {
      level: this.level,
      nested: this.level > 0
    };
  }
}
</script>

