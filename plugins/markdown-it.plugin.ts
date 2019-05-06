import markdown from "markdown-it";
import { INuxtContext } from "..";
import Vue from "vue";
import mermaidAPI from "mermaid/mermaidAPI";

// import foo from 'markdown-it-abbr'
// import foo from 'markdown-it-container'
// import foo from 'markdown-it-deflist'
// import foo from 'markdown-it-footnote'
// import foo from 'markdown-it-icons'
// import foo from 'markdown-it-ins'
// import foo from 'markdown-it-mark'
// import foo from 'markdown-it-sub'
// import foo from 'markdown-it-sup'
// import foo from 'markdown-it-'

// import mermaid from 'mermaid';
let mermaid: typeof mermaidAPI;

let timeout: any;

export default function(context: INuxtContext) {
  if (context.isClient) {
    mermaid = require("mermaid");
    mermaid.initialize({
      startOnLoad: false
    });
  }
  const Plugin = require("markdown-it-regexp");
  const faPlugin = Plugin(/\:fa-([\w\-]+)\:/, function(match, utils) {
    return '<i class="fa fa-' + utils.escape(match[1]) + '"></i>';
  });

  const mermaidChart = code => {
    if (context.isClient) {
      if (!timeout) {
        timeout = setTimeout(() => {
          (mermaid as any).init(undefined, `.el-markdown__mermaid`);
          timeout = null;
        }, 10);
      }

      try {
        const uid = Math.random()
          .toString(32)
          .slice(2);
        mermaid.parse(code);
        return `<div class="el-markdown__mermaid el-markdown__marmaid--${uid}">${code}</div>`;
      } catch ({ str, hash }) {
        return `<pre>${str}</pre>`;
      }
    } else {
      return code;
    }
  };

  const md = markdown()
    .use(require("markdown-it-prism"))
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-container'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-ins'))
    .use(faPlugin);

  md.core.ruler.push("heading_shift", function(state) {
    const tokens = state.tokens;

    tokens
      .filter(token => token.type === "heading_open")
      .forEach(token => {
        const level = Number(token.tag.substr(1));
        const shifted = Math.min(6, level + 1);
        token.tag = "h" + shifted;
      });
  });

  md.core.ruler.push("class_bemify", function(state) {
    function addClass(token) {
      let aIndex = token.attrIndex("class");
      let tokenTypeNormalized = token.type;

      if (tokenTypeNormalized.endsWith("_open")) {
        tokenTypeNormalized = tokenTypeNormalized.slice(0, -5);
      }

      if (aIndex < 0) {
        token.attrPush([
          "class",
          `md el-markdown__${tokenTypeNormalized} el-markdown__${tokenTypeNormalized}--${
            token.tag
          }`
        ]); // add new attribute
      } else {
        token.attrs[
          aIndex
        ][1] += ` md el-markdown__${tokenTypeNormalized} el-markdown__${tokenTypeNormalized}--${
          token.tag
        }`; // replace value of existing attr
      }
    }

    const temp = md.renderer.rules.fence.bind(md.renderer.rules);

    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      const code = token.content.trim();
      if (token.info === "mermaid") {
        return mermaidChart(code);
      }
      const firstLine = code.split(/\n/)[0].trim();
      if (
        firstLine === "gantt" ||
        firstLine === "sequenceDiagram" ||
        firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
      ) {
        return mermaidChart(code);
      }
      return temp(tokens, idx, options, env, slf);
    };

    for (let blockIndex = 0; blockIndex < state.tokens.length; blockIndex++) {
      const token = state.tokens[blockIndex];

      addClass(token);

      if (token.children) {
        for (
          let inlineIndex = 0;
          inlineIndex < token.children.length;
          inlineIndex++
        ) {
          const inlineToken = token.children[inlineIndex];

          if (inlineToken.tag) {
            addClass(inlineToken);
          }
        }
      }
    }
  });

  context.app.md = md;
  Vue.prototype.md = md;
}
