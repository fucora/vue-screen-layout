<template>
  <div class="core">
    <div v-for="item in row" :key="item"
         :style="{width: rowWidth + '%', height: rowHeight + '%'}">
      <div class="grid" v-for="sub in span" v-hidden="mergeList.indexOf(item+''+sub)!==-1" :key="sub"
           :style="{width: spanWidth + '%', height: spanHeight + '%', background: config ? gridColor[Math.floor(Math.random()*(item*sub))] : ''}">
        <slot :name="item+''+sub"></slot>
        <template v-if="config && mergeList.indexOf(item+''+sub)===-1">
          {{ item+''+sub }}
        </template>
      </div>
    </div>
    <div v-for="(value, key) in mergeStyle"
         :style="{position: 'absolute', width: value.width * spanWidth + '%', height: value.height * rowHeight  + '%',left: value.left * spanWidth + '%',top: value.top * rowHeight + '%'}"
         :class="{incorporated:config}">
      <slot :name="key"></slot>
      <template v-if="config">
        {{ value.name }}
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VueScreenLayout',
  props: {
    row: {
      type: Number,
      default: 1,
      required: true,
      validator (value) {
        if(/^[1-9]$/.test(value)){
          return true
        } else {
          console.error('Invalid prop: type check failed for prop "row". Expected an integer between 1 and 9, but can\'t get')
        }
      }
    },
    span: {
      type: Number,
      default: 1,
      required: true,
      validator (value) {
        if(/^[1-9]$/.test(value)){
          return true
        } else {
          console.error('Invalid prop: type check failed for prop "span". Expected an integer between 1 and 9, but can\'t get')
        }
      }
    },
    merge: {
      type: Object,
      default () {
        return {}
      }
    },
    config: {
      type: Boolean,
      default: false
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
    },
    mergeList () {
      let attrs = Object.keys(this.merge)
      let arr = []
      attrs.forEach((item) => {
        let max, min, rowStart, rowEnd, spanStart, spanEnd
        max = Math.max.apply(null, this.merge[item])
        min = Math.min.apply(null, this.merge[item])
        rowStart = Math.floor(min / 10)
        rowEnd = Math.floor(max / 10)
        spanStart = min % 10
        spanEnd = max % 10
        for (let i = rowStart; i <= rowEnd; i++) {
          for (let j = spanStart; j <= spanEnd; j++) {
            arr.push( i + '' + j)
          }
        }
      })
      return arr
    },
    mergeStyle () {
      let attrs = Object.keys(this.merge)
      let style = {}
      attrs.forEach((item) => {
        if(this.merge[item].length === 0) return style
        let max = Math.max.apply(null, this.merge[item])
        let min = Math.min.apply(null, this.merge[item])
        let top = Math.floor(min / 10)
        let left = min % 10
        style[item] = {
          name:item,
          left: left - 1,
          top: top - 1,
          width: max % 10 - left + 1,
          height: Math.floor(max / 10) - top + 1
        }
      })
      return style
    },
    gridColor () {
      let len = this.row * this.span
      let color = []
      for (let i = 0; i < len; i++) {
        color[i] = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`
      }
      return color
    }
  }
}
</script>
<style scoped>
  .core {
    width: 100%;
    height: 100%;
    position: relative;
  }
  div {
    box-sizing: border-box;
  }
  .core .grid {
    display: inline-block;
    vertical-align: top;
  }
  .incorporated {
    background: lightseagreen;
  }
</style>
