// import * as MarkdownIt from 'markdown-it'
// import * as StxateCore from 'markdown-it/lib/rules_core/state_core';
// import * as Token from 'markdown-it/lib/token';

// const { rendererRule, coreRuler } = require('markdown-it-regex')
const Plugin = require("markdown-it-regexp");
const prism = require('markdown-it-prism');

const faPlugin = Plugin(/\:fa-([\w\-]+)\:/, function(match, utils) {
  return '<i class="fa fa-' + utils.escape(match[1]) + '"></i>';
});

function addClass(token) {
  let aIndex = token.attrIndex("class");
  let tokenTypeNormalized = token.type;

  if (tokenTypeNormalized.endsWith("_open")) {
    tokenTypeNormalized = tokenTypeNormalized.slice(0, -5);
  }

  if (aIndex < 0) {
    token.attrPush([
      "class",
      `md md__${tokenTypeNormalized} md__${tokenTypeNormalized}--${token.tag}`
    ]); // add new attribute
  } else {
    token.attrs[
      aIndex
    ][1] += ` md md__${tokenTypeNormalized} md__${tokenTypeNormalized}--${
      token.tag
    }`; // replace value of existing attr
  }
}

module.exports = function mdplugin(md) {
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

  const icons = {
    regex: /(::fa-edit::)/i,
    replace: match => {
      console.log(match);
      return `<span>match</span>`; //<i class="fa fa-icon">test</i>`
    }
  };

  faPlugin(md)

  prism(md)
  // md.renderer.rules['fa-icons'] = (tokens, idx) => {
  //   return rendererRule(tokens, idx, icons)
  // }

  // md.core.ruler.push('fa-icons', function(state) {
  //   coreRuler(state, icons)
  // })

  md.core.ruler.push("class_bemify", function(state) {
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
};
