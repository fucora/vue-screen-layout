<template>
  <div id="app">
    <div style="margin: 17px">
      宽：<input type="text" v-model.number="span">
      高：<input type="text" v-model.number="row">
      merge: <input type="text" v-model="merge">
    </div>
    <vue-screen-layout :row="row" :span="span" :merge="grid" :config="true">
    </vue-screen-layout>
  </div>
</template>

<script>
import VueScreenLayout from '../src/vue-screen-layout.vue'
export default {
  name: 'app',
  data () {
    return {
      row: 4,
      span: 4,
      grid: {
        home: ['12','23'],
        test: ['43','44']
      },
      merge: ''
    }
  },
  watch: {
    merge(val){
      this.grid.home = val.split(',')
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
