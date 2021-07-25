<!--
  - Copyright(c) Oflane Software 2017. All Rights Reserved.
  -->

<template>
  <div id="nav" class="container">
    <el-row :gutter="20" v-for="item in items" :key="item.title">
      <h2>{{item.title}}</h2>
      <el-col :xs="8" :sm="6" :md="6" :lg="6" v-for="col in item.cols" :key="col.name">
        <router-link :to="col.url" class="unit">
          <img :src="col.img" alt="col.name">
        </router-link>
        <h4>{{col.name}}</h4>
      </el-col>
    </el-row>
    <el-dialog title="asdfasdfas" >
      <div slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import info from './data'
  import fase from 'fansion-base'

  const storage = fase.storage
  const SCROLL_HEIGHT_KEY = 'home-scroll-height-key'
  const cacheScrollTop = () => {
    const height = document.body.scrollTop
    storage.set(SCROLL_HEIGHT_KEY, height)
  }

  const restoreScroll = () => {
    const h = storage.get(SCROLL_HEIGHT_KEY)
    if (h) {
      document.body.scrollTop = Number(h)
    }
  }
  export default {
    data () {
      console.log(info)
      return {
        items: info
      }
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      restoreScroll()
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      cacheScrollTop()
      next()
    }
  }
</script>

<style scoped lang="less">
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  #nav {
    h2 {
      text-align: center;
      border-bottom: 1px solid #CCC;
      padding-bottom: 20px;
      margin-bottom: 20px;
      color: #019FDE;
      font-weight: bold;
    }
    .unit {
      position: relative;
      display: block;
      height: 140px;
      margin-bottom: 14px;
      background-color: #FFF;
      border: 1px solid #DDD;
      -webkit-border-radius: 10px;
      /* Safari and Chrome */
      -moz-border-radius: 10px;
      /* Firefox */
      -o-border-radius: 10px;
      /* Opera */
      border-radius: 10px;
    }
    .unit img {
      width: 100px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      -moz-transition: all 0.7s linear 0s;
      /* Firefox */
      -webkit-transition: all 0.7s linear 0s;
      /* Safari and Chrome */
      -o-transition: all 0.7s linear 0s;
      /* Opera */
      transition: all 0.7s linear 0s;
    }
    h4 {
      margin-top: 0;
      margin-bottom: 28px;
      text-align: center;
      font-family: 'Microsoft Yahei',serif,sans-serif,cursive;
      font-size: 18px;
    }
  }
</style>
