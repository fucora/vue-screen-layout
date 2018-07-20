import VueScreenLayout from './vue-screen-layout.vue'
export default VueScreenLayout
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vue-screen-layout', VueScreenLayout)
}
