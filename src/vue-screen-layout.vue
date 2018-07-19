<template>
  <div class="core">
    <div v-for="item in row" :key="item" :style="{width: rowWidth + '%', height: rowHeight + '%'}">
      <div class="grid" v-for="sub in span" v-hidden="mergeList.indexOf(item+''+sub)!==-1" :key="sub" :style="{width: spanWidth + '%', height: spanHeight + '%'}">
        <slot :name="item+''+sub">{{ item+''+sub }}</slot>
      </div>
    </div>
    <div v-for="(value, key) in mergeStyle" :style="{width: value.width * spanWidth + '%', height: value.height * rowHeight  + '%',left: value.left * spanWidth + '%',top: value.top * rowHeight + '%'}" class="incorporated">
      <slot :name="key"></slot>
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
      validator (value) {
        if(/^[0-9]$/.test(value)){
          return true
        } else {
          console.error('Invalid prop: type check failed for prop "row". Expected an integer between 0 and 9, but can\'t get')
        }
      }
    },
    span: {
      type: Number,
      default: 1,
      validator (value) {
        if(/^[0-9]$/.test(value)){
          return true
        } else {
          console.error('Invalid prop: type check failed for prop "span". Expected an integer between 0 and 9, but can\'t get')
        }
      }
    },
    merge: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      rowWidth: 100,
      spanHeight: 100,
      incorporated: {
        position: 'absolute',
        let: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    checkNum (val) {
      return /^[0-9]$/.test(val)
    }
  },
  watch: {
    merge: {
      deep: true,
      handler: function (val) {
      }
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
        arr = arr.concat(this.merge[item])
      })
      return arr
    },
    mergeStyle () {
      let attrs = Object.keys(this.merge)
      let style = {}
      attrs.forEach((item) => {
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
    }
  },
  directives: {
    hidden: {
      update (el, binding) {
        binding.value
          ? el.style.visibility = 'hidden'
          : el.style.visibility = 'visible'
      }
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
    border: 1px solid coral;
    display: inline-block;
    vertical-align: top;
  }
  .incorporated {
    position: absolute;
    background: lightseagreen;
  }
</style>
