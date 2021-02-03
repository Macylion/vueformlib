import * as components from '@/lib-components/index';
export * from '@/lib-components/index';

// Import vue components

const install = function installVueformlib(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
