<template>
  <div id="app">
    <div style="margin: 17px">
      宽：<input type="text" v-model.number="row" :key="1">
      高：<input type="text" v-model.number="span" :key="2">
    </div>
    <vue-screen-layout :row="row" :span="span"></vue-screen-layout>
  </div>
</template>

<script>
import VueScreenLayout from './vue-screen-layout.vue'
export default {
  name: 'app',
  data () {
    return {
      row: 1,
      span: 1
    }
  },
  components: {
    VueScreenLayout
  }
}
</script>

<style>
#app {
  width: 1000px;
  height: 500px;
}
</style>
