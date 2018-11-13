<template>
  <div class="navbar">
    <div class="navbar-inner">
      <ul class="nav pull-right">
        <li>
          <a href="#" class="hidden-phone visible-tablet visible-desktop" role="button">Settings</a>
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
      <a class="brand" href="index.html"><span class="first">Your</span> <span class="second">Company</span></a>
    </div>
  </div>
</template>
<style lang="less">
  .navbar {
    position: relative;
    z-index: 20;
    margin: 0px;
    padding: 0px;
    -webkit-box-shadow: 0px 0px 3px #cccccc;
    -moz-box-shadow: 0px 0px 3px #cccccc;
    box-shadow: 0px 0px 3px #cccccc;
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
      padding: 0em 1em;
      -webkit-border-radius: 0px;
      -moz-border-radius: 0px;
      border-radius: 0px;
      -moz-background-clip: padding;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 0px;
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
</style>
