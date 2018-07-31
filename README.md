# vue-screen-layout
> A fast screen layout component based on Vue.js
## How to use?
`npm install vue-screen-layout`
## Example
```
<template>
   <vue-screen-layout :row="row" :span="span" :merge="grid" :config="true">
      <template slot="home"></template>
      <template slot="43"></template>
   </vue-screen-layout>
</template>
<script>
import VueScreenLayout from 'vue-screen-layout'
export default {
  components: {
    VueScreenLayout
  },
  data () {
    row: 3,
    span: 4,
    grid: {
      home: ["12","23"]
    }
  }
}
</script>
```
## options
| 属性 | 类型 | 默认 | 描述 | 必须 |
|----|----|----| ----| ----|
| span | Number | 1 | 横向几块内容（1-9） | 是 |
| row | Number | 1 | 纵向几块内容（1-9） | 是 |
| merge | Object | | 要合并的块 | 否 |
| config | Boolean | false | 显示颜色和文字 | 否 |

## Explain
`vue-screen-layout`默认会生成span*row块div（屏幕），当你需要为某块div添加内容时，你只需要这样做：
1. `<template slot="12"></tempalte>`，具体的slot name，你可以打开config去查看（可以想象一个坐标系）。
2. `merge`需要传入一个对象，key为将来要用的slot name，value为你要合并的内容，只需要传入对应的位置（告诉它最小位置和最大位置，画一个矩形。比如：["12", "23"]指将<12,13,22,23>这四块合并为一块），也可以打开config去看。

