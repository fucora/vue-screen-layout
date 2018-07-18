<template>
  <div class="core">
    <div v-for="item in row" :key="item" :style="{width: rowWidth + '%', height: rowHeight + '%'}">
      <div v-for="sub in span" :key="sub" :style="{width: spanWidth + '%', height: spanHeight + '%'}">
        {{ sub }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VueScreenLayout',
  props: {
    row: {
      type: Number,
      default: 1
    },
    span: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      rowWidth: 100,
      spanHeight: 100
    }
  },
  computed: {
    rowHeight () {
      return 100 / this.row
    },
    spanWidth () {
      return 100 / this.span
    }
  }
}
</script>
<style scoped>
  .core {
    width: 100%;
    height: 100%;
  }
  div {
    box-sizing: border-box;
  }
  .core div div {
    border: 1px solid coral;
    display: inline-block;
  }
</style>
