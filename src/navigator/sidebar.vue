<template>
  <div class="siderbar">
    <div style="height:41px;"></div>
    <el-menu class="sidebar-menu" :router="true"
      :default-active="path" ref="menu">
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
  import Ps from 'perfect-scrollbar'
  import 'perfect-scrollbar/css/perfect-scrollbar.css'

  const reg = /(\/.*)(\?.*)?/
  function openApp (vm) {
    const paths = [{ name: '首页', path: '/index' }]
    if (vm.path !== '/index') {
      const sb = vm.$refs.menu
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
    props: ['collapse'],
    data: function () {
      const path = reg.exec(window.location.hash)[1]
      return {
        data: MenuData,
        path
      }
    },
    mounted () {
      Ps.initialize(this.$el, {
        suppressScrollX: true
      })

      this.$refs.menu.$watch('openedMenus', () => {
        this.$nextTick(() => {
          this.scrollSubmenu()
          this.positionSubmenu()
        })
      }, { deep: true, immediate: true })
    },
    methods: {
      refreshPath () {
        this.path = reg.exec(window.location.hash)[1]
        openApp(this)
      },
      positionSubmenu () {
        const submenus = this.$refs.menu.$children
        submenus.forEach(submenu => {
          if (submenu.opened) {
            const psEl = submenu.$el.querySelector('.el-menu')
            const maxHeight = this.$el.offsetHeight - submenu.$el.offsetTop + submenu.$el.scrollHeight
            if (maxHeight < psEl.scrollHeight) {
              psEl.style.bottom = '5px'
            }
            psEl.style.top = submenu.$el.offsetTop - this.$el.scrollTop + this.$el.offsetTop + 'px'
          }
        })
      },
      scrollSubmenu () {
        const submenus = this.$refs.menu.$children
        submenus.forEach(submenu => {
          if (submenu.opened) {
            if (!submenu.psEl) {
              submenu.psEl = submenu.$el.querySelector('.el-menu')
              Ps.initialize(submenu.psEl, {
                suppressScrollX: true
              })
            }
            if (submenu.psEl.classList) {
              !submenu.psEl.classList.contains('ps') && submenu.psEl.classList.add('ps', 'ps--theme_default')
            } else {
              submenu.psEl.className.indexOf('ps') === -1 && (submenu.psEl.className += ' ps ps--theme_default')
            }
          }
        })
      }
    },
    watch: {
      $route: 'refreshPath',
      collapse () {
        if (this.collapse) {
          this.scrollSubmenu()
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../style/variables.less";
  .app {
    .sidebar {
      float: left;
      top: var(--navbar-height);
      bottom: 0;
      width: var(--sidebar-width);
      background-color: #fff;
      overflow: visible;

      @media (max-width: 768px) {
        &.collapse {
          display: none;
        }
      }

      &.sidebar-fixed {
        position: fixed;
        z-index: 999;
      }

      &:before {
        content: "";
        position: fixed;
        top: 0;
        bottom: 0;
        width: var(--sidebar-width);
        background-color: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);
      }

      &.collapse, &.collapse:before {
        width: var(--sidebar-collapse-width);
      }

      &.collapse > .el-menu {
        & .el-submenu .el-menu {
          position: fixed;
          top: var(--navbar-height);
          left: var(--sidebar-collapse-width);
        }
      }

      &:not(.collapse) {
        > .el-menu .el-submenu .el-menu {
          top: 0 !important;
          bottom: initial !important;
        }
      }

      .el-menu-item .fa, .el-submenu .fa {
        vertical-align: baseline;
        margin-right: 10px;
      }

      > .el-menu {
        background-color: #fff;
        transition: initial;
        width: var(--sidebar-width);

        &.el-menu--collapse, &.el-menu--collapse:before {
          width: var(--sidebar-collapse-width);
        }

        > .el-menu-item, > .el-submenu {
          margin-top: -1px;
          border-top: 1px solid color(var(--color-light-white) shade(3%));
          border-bottom: 1px solid color(var(--color-light-white) shade(3%));
        }

        .el-submenu .el-menu {
          background-color: var(--color-dark-white);
        }

        &.el-menu--collapse {
          .el-submenu .el-menu {
            box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, .2), 5px 5px 5px -5px rgba(0, 0, 0, .2), 5px 5px 5px -5px rgba(0, 0, 0, .2);
            margin-left: 1px;
          }
        }

        &:not(.el-menu--collapse) {
          .el-submenu .el-menu {
            box-shadow: inset 0 4px 4px -2px rgba(0, 0, 0, .15), inset 0 -4px 4px -2px rgba(0, 0, 0, .15);
            background-color: var(--color-dark-white);
            &:before {
              content: "";
              display: block;
              position: absolute;
              z-index: 1;
              left: 25px;
              top: 0;
              bottom: 0;
              border-left: 1px solid var(--color-light-gray);
            }
          }

          .el-submenu .el-menu-item {
            &:before {
              content: "";
              position: absolute;
              width: 4px;
              height: 4px;
              left: 23px;
              top: 0;
              bottom: 0;
              margin: auto;
              z-index: 2;
              background-color: var(--color-dark-white);
              border: 1px solid var(--color-light-gray);
            }

            &.is-active:before {
              background-color: var(--color-primary);
            }
          }
        }

        .el-menu-item:hover, .el-submenu__title:hover {
          background-color: var(--color-extra-light-gray);
        }
      }
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
