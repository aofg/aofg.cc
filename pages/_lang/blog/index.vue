<template>
  <div v-bem class="container mx-auto">
    <div v-bem: class="row">
      <article v-bem:post class="col-4" v-for="(post, index) in posts" :key="index">
        <div v-bem:post-thumbnail>
          <img :src="post.thumb" v-bem:post-thumbnail-img>
        </div>
        <h3 v-bem:post-title>
          {{ post.title }}
        </h3>
        <div v-bem:meta>
          <span>{{ post.createdAt }}</span>
          <span>by</span>
          <a href="#">{{ post.author.username }}</a>
          <br>
          <span v-for='(tag, index) in post.tags' :key="index">{{ tag }} </span>
        </div>
      </article>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";
import axios from "axios";

@Component(<any>{
  name: "page",
  components: {},
  async asyncData() {
    return {};
  }
})
export default class extends Vue {
  posts = [
    { 
      thumb: "http://localhost:4000/content/images/64f6abbc5d042bfc0e62bf0df5f5fd1d.jpg",
      title: "Post 1",
      createdAt: new Date(),
      author: {
        username: "alerdenisov"
      },
      tags: [
        "devlog"
      ]
    },
    { 
      thumb: "http://localhost:4000/content/images/87f9c9c31b5bb9c8b1c71db041080334.jpg",
      title: "Post 1",
      createdAt: new Date(),
      author: {
        username: "alerdenisov"
      },
      tags: [
        "devlog"
      ]
    },
    { 
      thumb: "http://localhost:4000/content/images/45003d7d07dff7c582c332de84570944.jpg",
      title: "Post 1",
      createdAt: new Date(),
      author: {
        username: "alerdenisov"
      },
      tags: [
        "devlog"
      ]
    },
    { 
      thumb: "http://localhost:4000/content/images/e1d1f7674ab59e63e4319855402ca053.jpg",
      title: "Post 1",
      createdAt: new Date(),
      author: {
        username: "alerdenisov"
      },
      tags: [
        "devlog"
      ]
    },
    { 
      thumb: "http://localhost:4000/content/images/e55abca472193d8473de0a93f119ce06.jpg",
      title: "Post 1",
      createdAt: new Date(),
      author: {
        username: "alerdenisov"
      },
      tags: [
        "devlog"
      ]
    },
  ]

  get modificators() {
    return {
      type: "blog"
    }
  }
}
</script>