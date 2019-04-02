import Vue, { VNode, VNodeDirective } from 'vue';
// import { DirectiveBinding } from 'vue/types/options';

function getComponentName(node: VNode): string {
  if (node.context && node.context.$options && (node.context.$options.name || (<any>node.context.$options)._componentTag))
    return node.context.$options.name || (<any>node.context.$options)._componentTag;
  return 'na';
}

function getModificators(node: VNode) {
  if (node.context) {
    
    let propMod = {}
    let calcMod = {}
    let argMod  = {}
    let anynode = node as any;
    if(anynode.context && anynode.context.mods) {
      propMod = anynode.context.mods
    } 
    
    if (anynode.context && anynode.context.modificators) {
      calcMod = anynode.context.modificators;
    }

    if(anynode.data && anynode.data.attrs && anynode.data.attrs.mods) {
      argMod = anynode.data.attrs.mods
    } 

    return Object.assign({}, argMod, calcMod, propMod);
  }
  return {};
}

function isObject(someting: any) {
  return someting && typeof someting === 'object' && someting !== null && someting.constructor === Object;
}

function isString(val: any): boolean {
  return val && typeof val === 'string' && val.length > 0;
}


Vue.directive('bem', (el: HTMLElement, binding: any, node: VNode) => {
  let block = getComponentName(node);

  let bemClasses = block;

  if (binding.arg) {
    bemClasses += `__${binding.arg}`;
  }

  const mods = Object.assign({}, binding.modifiers || {}, isObject(binding.value) ? binding.value : {}, getModificators(node));

  bemClasses += Object.keys(mods).reduce((prev, name) => {
    const val = mods[name];
    if (typeof val === "boolean") {
      if (val) {
        prev += ` ${bemClasses}--${name}`;
      }
    } else if (isString(val) || typeof val === "number") {
      prev += ` ${bemClasses}--${name}-${mods[name]}`;
    }

    return prev;
  }, '');

  el.className = el.className
    .split(' ')
    .filter(c => !c.startsWith(block))
    .join(' ');

  el.classList.add(...bemClasses.split(' '));
});

Vue.mixin({
  props: {
    mods: {
      required: false,
      type: Object,
      default: () => {}
    }
  }
})
