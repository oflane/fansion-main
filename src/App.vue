<!--
  - Copyright(c) Oflane Software 2017. All Rights Reserved.
  -->

<!--主应用-->
<template>
  <div id="fansionApp" class="clearfix">
    <dialogs/>
    <navigator ref="navigator">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view class="main-content" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view class="main-content" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </navigator>
  </div>
</template>

<script>
  import navigator from './navigator'
  import fase from 'fansion-base'
  const dialogs = fase.dialogSet

  export default {
    name: 'Fansion',
    components: {
      navigator,
      dialogs
    }
  }
</script>

<style lang="less">
  #fansionApp {
    font-family: 'Microsoft YaHei', SimSun, sans-serif;
    color: #333;
    font-size: 14px;
    line-height: 1;
    height:100%;
    width: 100%;
    position: absolute;
    background: #F5F5F5;
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit;
    }
    .main-content {
      min-height: 800px;
      height:100%;
      width:100%;
      display: table;
    }
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
