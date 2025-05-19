<template>
  <div id="main" class="markdow-page">
    <div class="grid-wapper">
      <div class="grid-view">
        <Viewer ref="markDownRef" :locale="zh" :value="value" :plugins="plugins" />
      </div>
      <!--显示目录-->
<!--      <div class="marker-card">-->
<!--        <a v-for="(item, index) in cateList" :key="index" :class="[{ active: anchor == index }, item.tagName + '-class']" class="marker-item" @click="scrollToSection('head-' + index, index)">{{ item.text }}{{ index }}</a>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script setup>
import {reactive, toRefs, markRaw, onMounted, nextTick, onUnmounted, ref} from 'vue'
import { Viewer } from '@bytemd/vue-next'
import { getProcessor } from 'bytemd'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight' // 代码高亮
import frontmatter from '@bytemd/plugin-frontmatter' // 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom' // 缩放图片
import breaks from '@bytemd/plugin-breaks'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css' // 掘金同款样式
import { findIndex } from 'lodash'
import { setTheme  } from 'bytemd-plugin-theme';

const pluginsList = [gfm(), gemoji(), highlight(), frontmatter(), mediumZoom(), breaks()]
/*
 *@Description: 状态初始化
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:36
 */
const state = reactive({
  value: '',
  plugins: markRaw(pluginsList),
  zh: zhHans,
  cateList: [], // 目录内容
  offsetTopList: [], //文档流中锚点距离顶部距离集合
  anchor: 0,
})
const { anchor, value, plugins, zh, markDownRef, cateList } = toRefs(state)

onMounted(() => {
  state.value = `>不知道有没有被缩写搞头疼过，为什么明明直接说全程就能明白的名词就要搞缩写。。。



以下是各模块化规范的对比分析，一张表直接理解：

| 特性               | CommonJS               | AMD (RequireJS)       | CMD (Sea.js)         | ES6 Modules           |
|-------------------------|----------------------------|---------------------------|---------------------------|---------------------------|
| **加载方式**            | 同步加载（服务器端）         | 异步加载（浏览器端）       | 异步加载（浏览器端）       | 静态加载（编译时确定依赖）   |
| **语法**                | \`require\` / \`module.exports\` | \`define\` / \`require\`      | \`define\` / \`require\`      | \`import\` / \`export\`        |
| **依赖声明时机**        | 动态依赖（运行时解析）       | 依赖前置（提前声明）       | 依赖就近（按需声明）       | 静态依赖（编译时解析）       |
| **模块执行时机**        | 加载时执行                  | 提前执行（依赖前置）       | 延迟执行（按需执行）       | 编译时加载，只执行一次       |
| **输出类型**            | 值的拷贝（原始类型不受影响） | 值的拷贝                   | 值的拷贝                   | 值的引用（实时绑定）         |
| **循环依赖处理**        | 支持但可能导致部分加载       | 支持但需谨慎管理           | 支持但需谨慎管理           | 静态分析支持更好             |
| **适用环境**            | Node.js                    | 浏览器端                  | 浏览器端                  | 浏览器 + Node.js（现代环境） |
| **优缺点**              | ✅ 简单易用<br>❌ 同步加载不适用浏览器 | ✅ 异步加载优化性能<br>❌ 依赖前置不够灵活 | ✅ 依赖就近更灵活<br>❌ 社区生态较小 | ✅ 语言标准、静态优化<br>❌ 旧环境需转译 |

---

## 详细解释及代码示例

#### **1. CommonJS**
- **场景**：Node.js 的默认模块系统。
- **特点**：
  - 同步加载模块，模块在首次 \`require\` 时加载并执行。
  - 输出的是值的拷贝（原始类型为拷贝，对象为引用）。
  \`\`\`javascript
  // math.js
  let counter = 0;
  const add = () => counter++;
  module.exports = { counter, add };

  // main.js
  const { counter, add } = require('./math');
  add();
  console.log(counter); // 输出 0（counter 是拷贝值）
  \`\`\`

#### **2. AMD (Asynchronous Module Definition)**
- **场景**：浏览器端异步加载（如 RequireJS）。
- **特点**：
  - 依赖前置，模块加载后立即执行。
  \`\`\`javascript
  // 定义模块
  define(['dep1', 'dep2'], function(dep1, dep2) {
    return { method: () => dep1.doSomething() };
  });

  // 使用模块
  require(['moduleA'], function(moduleA) {
    moduleA.method();
  });
  \`\`\`

#### **3. CMD (Common Module Definition)**
- **场景**：浏览器端（如 Sea.js），强调按需加载。
- **特点**：
  - 依赖就近，模块使用时才加载。
  \`\`\`javascript
  define(function(require, exports, module) {
    const dep1 = require('dep1'); // 按需加载
    exports.method = () => dep1.doSomething();
  });
  \`\`\`

#### **4. ES6 Modules**
- **场景**：现代浏览器和 Node.js（需配置）。
- **特点**：
  - 静态分析，编译时确定依赖。
  - 输出值的引用（实时绑定）。
  \`\`\`javascript
  // math.js
  export let counter = 0;
  export const add = () => counter++;

  // main.js
  import { counter, add } from './math.js';
  add();
  console.log(counter); // 输出 1（counter 是引用）
  \`\`\`

---

## 再废话一次，核心区别总结
1. **加载机制**：
   - CommonJS 同步加载，适合服务器。
   - AMD/CMD 异步加载，适合浏览器。
   - ES6 静态加载，通用且支持优化。

2. **模块定义与依赖管理**：
   - CommonJS/AMD/CMD 动态依赖，ES6 静态依赖。
   - AMD 依赖前置，CMD 依赖就近，ES6 依赖声明在顶部。

3. **值的传递**：
   - CommonJS/AMD/CMD 输出值拷贝，ES6 输出实时引用。

4. **生态与未来**：
   - ES6 是语言标准，支持 Tree-shaking 等优化。
   - CommonJS 主导 Node.js 生态，AMD/CMD 逐渐被替代。

---

## 在实际应用中建议大家
- **现代项目**：优先使用 **ES6 Modules**，结合 Webpack/Rollup 打包兼容旧环境。
- **Node.js 开发**：CommonJS 为主，逐步迁移到 ES6。
- **遗留浏览器项目**：AMD 或 CMD 过渡，最终转向 ES6 + 打包工具。`
  getCataLogData()
  nextTick(() => {
    transformToId()
    // 获取内容的所有锚点距离顶部的距离
    getCalcLateTop()
    // 监听页面滚动获取当前第几个锚点
    window.addEventListener('scroll', scrollHandle)
    window.onresize = () => {
      getCalcLateTop()
    }
    setTheme ('condensed-night-purple')
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})

/*
 *@Description: 获取目录
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:49
 */
const getCataLogData = () => {
  getProcessor({
    plugins: [
      {
        rehype: p =>
            p.use(() => tree => {
              if (tree && tree.children.length) {
                console.log(tree)
                createCataLog(tree)
              }
            }),
      },
    ],
  }).processSync(state.value)
}

const createCataLog = tree => {
  const items = []
  tree.children
      .filter(v => v.type == 'element')
      .forEach(node => {
        if (node.tagName === 'h2' && node.children.length > 0) {
          items.push({
            tagName: node.tagName,
            text: stringifyHeading(node),
          })
        }
      })
  state.cateList = items
  console.log(state.cateList[0])
}

const stringifyHeading = node => {
  let result = ''
  node.children.forEach(item => {
    if (item.type == 'text') {
      result += item.value
    }
  })
  return result
}
/*
 *@Description: 设置锚点ID
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 17:03:21
 */
const transformToId = () => {
  const dom = document.querySelector('.markdown-body')
  let children = Array.from(dom.children)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const tagName = children[i].tagName
      if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3') {
        const index = findIndex(state.cateList, v => v.text === children[i].textContent)
        if (index >= 0) {
          children[i].setAttribute('id', `head-${index}`)
        }
      }
    }
  }
}
/**
 * 目录与标题联动问题
 * 1:点击目录滚动到锚点
 * 2:监听滚动-获取滚动位置最近的标签-做目录联动
 *
 */
const scrollToSection = (sectionId, index) => {
  state.anchor = index
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
const getCalcLateTop = () => {
  const mainEl = document.querySelector('#main')
  state.offsetTopList = state.cateList.map((item, index) => {
    const element = document.querySelector(`#head-${index}`)
    return {
      offsetTop: index === 0 ? mainEl.offsetTop : element.offsetTop,
      anchor: index,
    }
  })
}
const scrollHandle = () => {
  const curScrollTop = document.documentElement.scrollTop
      || window.pageYOffset
      || document.body.scrollTop

  let flag = true
  const len = state.offsetTopList.length
  const min = state.offsetTopList[0].offsetTop
  // 滚动的距离 小于 第一个锚点距离顶部的距离
  if (curScrollTop < min) {
    state.anchor = 0
    return
  }
  // 滚动的距离 与 全部锚点距离顶部距离的集合 比较 获取最近的锚点标识
  for (let i = len - 1; i >= 0; i--) {
    const curReference = state.offsetTopList[i].offsetTop // 当前参考值
    if (flag && curScrollTop >= curReference - 100) {
      flag = false
      state.anchor = state.offsetTopList[i].anchor
    }
  }
}
</script>
<style lang="scss" scoped>
.markdow-page {
  width: 100%;
  height: 100vh;
  :deep() {
    .bytemd {
      height: calc(100vh - 200px);
    }
  }
}
</style>
<style lang="scss" scoped>
.grid-wapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .grid-view {
    width: 1200px;
  }
  .marker-card {
    width: 200px;
    background-color: antiquewhite;
    padding: 10px;
    position: fixed;
    right: 20px;
    .marker-item {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      display: block;
      &:hover {
        color: rebeccapurple;
      }
      &.h3-class {
        padding-left: 15px;
      }
      &.active {
        color: red !important;
      }
    }
  }
}
</style>
