<template>
  <div class="siderbar">
    <div style="height:41px;"></div>
    <el-menu ref="sidebarMenu" class="sidebar-menu" :router="true"
      :default-active="path" >
      <template v-for="o in data">
        <el-menu-item :index="o.location" v-if="!o.children || o.children.length === 0" :key="o.location"><i :class="o.icon" v-if="o.icon!=null"></i>{{o.name}}<i class="pull-right el-icon-document"></i></el-menu-item>
        <el-submenu :index="o.location" v-if="o.children && o.children.length > 0" :key="o.location">
          <template slot="title">{{o.name}}</template>
          <template v-for="i in o.children">
          <el-menu-item :index="i.location" :key="i.location"><i class="fa fa-circle-o"/> {{i.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import MenuData from '~/data/menus.json'
  const reg = /(\/.*)(\?.*)?/
  function openApp (vm) {
    const paths = [{ name: '首页', path: '/index' }]
    if (vm.path !== '/index') {
      const sb = vm.$refs.sidebarMenu
      const citem = sb.items[vm.path]
      if (!citem) {
        return
      }
      const ls = citem.indexPath
      ls.forEach((n, i) => {
        if (i !== ls.length - 1) {
          paths.push({ name: sb.submenus[n].$el.children[0].innerText })
        }
      })
      paths.push({ name: citem.$el.innerText, path: citem.index })
    }
    console.log(vm.$route)
    vm.$emit('openedApp', paths)
  }
  export default {
    data: function () {
      const path = reg.exec(window.location.hash)[1]
      return {
        data: MenuData,
        path
      }
    },
    methods: {
      refreshPath () {
        this.path = reg.exec(window.location.hash)[1]
        openApp(this)
      }
    },
    watch: {
      $route: 'refreshPath'
    }
  }
</script>
<style lang="less">
  .siderbar {
    display: flow-root;
    min-height: 100%;
    width: 200px;
    position: absolute;
    top: 0;
    border-right: 3px solid #999999;
    background-color: #eeeff1;
    i{
      font-size: 18px;
      margin-right: 6px;
      vertical-align: middle;
    }
    i.fa-circle-o{
      font-size: 0.5em;
      vertical-align: middle;
    }
    i.pull-right {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -7px;
      transition: transform .3s;
      font-size: 14px;
    }
  }
  .el-menu.sidebar-menu {
    width: 100%;
    border-top: none;
    border-left: none;
    margin: 0;
    >.el-menu-item {
      height: 42px;
      border-top: 1px solid #ffffff;
      border-bottom: 1px solid #c8c8cb;

      background: #efeff0;
      background: -ms-linear-gradient(bottom, #efeff0, #ffffff);
      background: -moz-linear-gradient(center bottom, #efeff0 0%, #ffffff 100%);
      background: -o-linear-gradient(bottom, #efeff0, #ffffff);
      background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #efeff0), color-stop(1, #ffffff));
      filter: progid:dximagetransform.microsoft.gradient(startColorStr='#4d5b76', EndColorStr='#6c7a95');
      -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#ffffff',EndColorStr='#efeff0')";
      font-size: 1em;
      line-height: 38px;
      padding: 0 .25em;
    }
    >.el-submenu{
      &.is-opened{
        border-bottom: 1px solid #ccc;
      }
      >.el-menu{
        background: #f6f6f6;
      }
      >.el-submenu__title {
        height: 42px;
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #c8c8cb;
        border-left: none;
        color: #333;
        display: block;
        background: #efeff0;
        background: -ms-linear-gradient(bottom, #efeff0, #ffffff);
        background: -moz-linear-gradient(center bottom, #efeff0 0%, #ffffff 100%);
        background: -o-linear-gradient(bottom, #efeff0, #ffffff);
        background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #efeff0), color-stop(1, #ffffff));
        filter: progid:dximagetransform.microsoft.gradient(startColorStr='#4d5b76', EndColorStr='#6c7a95');
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#ffffff',EndColorStr='#efeff0')";
        font-weight: normal;
        font-size: 1em;
        line-height: 38px;
        padding: 0 .25em;
        margin-bottom: 0;
        text-shadow: none;
        text-transform: none;
      }
      .el-menu-item {
        min-width: 196px;
        line-height: 45px;
        height: 45px;
        padding: 0 30px!important;
      }
    }
  }
</style>
