<!--
 --添加注释
 --author Paul.Yang E-mail:yaboocn@qq.com
 --version 1.0 2017-7-13
 -->
<template>
  <div class="navigator">
    <nav-header/>
    <sidebar @openedApp="changeApp"/>
    <page-content ref="pageContent" :paths ="paths" :title="title">
      <slot/>
    </page-content>
  </div>
</template>
<script>
  import Vue from 'vue'
  import navHeader from './header'
  import sidebar from './sidebar'
  import pageContent from './page-content'
  export default {
    name: 'navigator',
    data () {
      return {
        paths: [],
        title: '首页'
      }
    },
    created () {
      const vm = this
      Object.defineProperty(Vue.prototype, '$navigator', {
        get () { return vm }
      })
    },
    methods: {
      changeApp (paths) {
        this.paths = paths
        this.title = paths[paths.length - 1].name
      },
      setTitle (title) {
        this.$refs.pageContent.title = title
      },
      showMessage (message, type) {
        this.$refs.pageContent.showMessage(message, type)
      }
    },
    components: {
      navHeader,
      sidebar,
      pageContent
    }
  }
</script>
<style>
  .navigator{
    position: relative;
    min-height:100%;
  }
</style>
