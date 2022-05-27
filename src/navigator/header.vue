<template>
  <div class="navbar">
    <div class="navbar-inner">
      <ul class="nav pull-right">
        <li>
          <el-dropdown>
            <a class="el-dropdown-link">
              <span class="heartbit">
                <i class="fa fa-bell-o"></i>
              </span>
            </a>
            <el-dropdown-menu slot="dropdown" class="notification">
              <el-dropdown-item disabled class="title">You have 3 new notifications.</el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <el-dropdown-item>
                <el-row>
                  <el-col :span="4">
                  <span class="fa-stack fa-lg text-info text-xs">
                    <i class="fa fa-circle-thin fa-stack-2x"></i>
                    <i class="fa fa-info fa-stack-1x"></i>
                  </span>
                  </el-col>
                  <el-col :span="20">
                    <h5 class="m-y-0">3 New Followers</h5>
                    <p class="text-muted text-xs">
                      <span>4 minutes ago</span>
                    </p>
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <el-dropdown-item>
                <el-row>
                  <el-col :span="4">
                  <span class="fa-stack fa-lg text-success text-xs">
                    <i class="fa fa-circle-thin fa-stack-2x"></i>
                    <i class="fa fa-check fa-stack-1x"></i>
                  </span>
                  </el-col>
                  <el-col :span="20">
                    <h5 class="m-y-0">Server Rebooted</h5>
                    <p class="text-muted text-xs m-y-0">
                      <span>15 minutes ago</span>
                    </p>
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <el-dropdown-item>
                <el-row>
                  <el-col :span="4">
                  <span class="fa-stack fa-lg text-warning text-xs">
                    <i class="fa fa-circle-thin fa-stack-2x"></i>
                    <i class="fa fa-exclamation fa-stack-1x"></i>
                  </span>
                  </el-col>
                  <el-col :span="20">
                    <h5 class="m-y-0">Your password was recently updated. Please complete your security questions from your profile page. </h5>
                    <p class="text-muted text-xs m-y-0">
                      <span>20 minutes ago</span>
                    </p>
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <el-dropdown-item class="more">
                View all notifications<i class="m-l-5 fa fa-angle-right"></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              My Account<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class="nav-dropdown" slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item divided>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="sidebar-collapse" @click="toggleSidebar" :class="{active: collapse}">
        <i class="fa fa-bars"></i>
      </div>
      <a class="brand" href="index.html"><span class="first">Your</span> <span class="second">Company</span></a>
    </div>
  </div>
</template>
<script>
  import Ps from 'perfect-scrollbar'
  import 'perfect-scrollbar/css/perfect-scrollbar.css'

  export default {
    name: 'header',
    props: ['collapse'],
    mounted () {
      this.initScoll()
    },
    methods: {
      toggleSidebar () {
        this.$emit('update:collapse', !this.collapse)
      },
      initScoll () {
        Ps.initialize(this.$el.querySelector('.notification'), {
          suppressScrollX: true
        })
      }
    }
  }
</script>
<style lang="less">
  .navbar {
    position: relative;
    z-index: 20;
    margin: 0;
    padding: 0;
    -webkit-box-shadow: 0 0 3px #cccccc;
    -moz-box-shadow: 0 0 3px #cccccc;
    box-shadow: 0 0 3px #cccccc;
    color: #777777;
    .navbar-inner {
      min-height: 41px;
      background: #4d5b76;
      background: -ms-linear-gradient(bottom, #4d5b76, #6c7a95);
      background: -moz-linear-gradient(center bottom, #4d5b76 0%, #6c7a95 100%);
      background: -o-linear-gradient(bottom, #4d5b76, #6c7a95);
      background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #4d5b76), color-stop(1, #6c7a95));
      filter: progid:dximagetransform.microsoft.gradient(startColorStr='#4d5b76', EndColorStr='#6c7a95');
      -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#6c7a95',EndColorStr='#4d5b76')";
      padding: 0 1em;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      -moz-background-clip: padding;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 0;
      border-bottom: none;
    }
    .brand {
      float: left;
      display: block;
      padding: 10px 20px 10px;
      margin-left: -20px;
      font-size: 20px;
      font-weight: 200;
      color: #777777;
    }
    .nav {
      margin: 0;
      position: relative;
      left: 0;
      display: block;
      float: right;
      list-style: none;
      > li {
        float: left;
        line-height: 20px;
        &:hover {
          background-color: #444;
        }
        > a {
          display: inherit !important;
          color: #fff;
          text-shadow: none;
          float: none;
          font-size:14px;
          padding: 10px 15px 10px;
        }
        li.dropdown.open > .dropdown-toggle {
          background-color: #444;
          color: #fff;
        }
      }
      .dropdown-menu a:hover {
        background: none;
        color: #000;
      }
    }
    .el-dropdown>.el-dropdown-link{
      display: inherit !important;
      padding: 10px 15px 10px;
      color:#fff;
      cursor: pointer;
      i{
        padding-left: 4px;
        font-size:10px;
      }
    }
  }
  .brand{
    font-family: georgia, serif;
    .first{
      color: #ccc;
      font-style: italic;
    }
    .second {
      color: #fff;
      font-weight: bold;
    }
  }
  .nav-dropdown{
    min-width: 160px!important;
  }
  .notification {
    width: 250px;
    max-height: 310px;

    &.el-dropdown-menu {
      padding: 0;
      margin: 0;
    }

    .el-dropdown-menu__item {
      color: #333;
      line-height: calc(20/14);
      font-size: 14px;
      font-weight: normal;
      padding: 10px;

      &:hover {
        color: #333;
      }

      &.el-dropdown-menu__item--divided {
        margin: 0;
        padding: 0 10px;
        &:before {
          height: 0;
        }
      }

      &.title {
        background-color: #20a0ff;
      }

      &.more {
        color: var(--color-primary);
        text-align: center;
        background-color: #20a0ff;
        i {
          margin-left: 5px;
        }
      }
    }
    h5 {
       font-size: 14px;
       margin: 0;
       font-weight: normal;
     }

    p {
      margin: 0;
    }
  }
</style>
