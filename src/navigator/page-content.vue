<!--
 -- 应用头部标题和面包屑导航
 -- author Paul.Yang E-mail:yaboocn@qq.com
 -- version 1.0 2017-7-15
 -->
<template>
  <div  id="pageContent">
    <el-row>
      <el-col :span="5">
        <h2 class="title-content-header">
          <i class="icon-window"></i>
          <span>{{title}}</span>
        </h2>
      </el-col>
      <el-col :span="13">
        <div class="devider-vertical visible-lg"></div>
        <div class="title-middle-header">
          <div class="alert" :class="message.type" v-if="message">
            <button type="button" class="close" @click="closeMessage()">×</button>
            <i :class="message.icon"></i>
            {{message}}
          </div>&nbsp;
        </div>
      </el-col>
      <el-col :span="6">
        <div class="devider-vertical visible-lg"></div>
        <el-breadcrumb separator="/">
          <template v-for="(p, i) in paths" >
            <el-breadcrumb-item :to="{ path: p.path }" :key="p.path"><i class="fa fa-home" v-if="i==0"/> {{p.name}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <slot/>
  </div>
</template>
<script>
  function getIcon (type) {
    switch (type) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'error':
      return 'error'
    }
    return 'info'
  }
  export default {
    name: 'PageContent',
    props: {
      paths: Array,
      title: String
    },
    data () {
      return {
        message: null
      }
    },
    methods: {
      showMessage (message, type = 'info') {
        const icon = getIcon(type)
        this.message = { message, type, icon }
      },
      closeMessage () {
        this.message = null
      }
    }
  }
</script>
<style lang="less">
  #pageContent {
    padding: 0;
    margin-left: 200px;
    -moz-background-size: 52% 52%;
    -webkit-background-size: 52% 52%;
    background-size: 52% 52%;
    &:before {
      content:"";
      position: absolute;
      background: #fff;
      border-width: 0 30px 30px 0;
      border-style: solid;
      border-color: #ffffff rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3);
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
    >.el-row{
      border-bottom: 1px solid #DDDDDD;
      padding: 0;
      height: 50px;
    }
    .devider-vertical{
      float: left;
      height: 50px;
      display: inline-block;
      width: 3px;
      border-right: 1px dashed rgb(204, 204, 204);
    }
    .el-breadcrumb{
      float:right;
      margin: 17px 15px 0 0;
      .el-breadcrumb__inner{
        font-weight: 400;
      }
      i{
        font-size:1.2em;
        font-weight: 400;
        vertical-align: text-bottom;
      }
    }
  }
  .title-content-header{
    color: #9EA7B3 !important;
    font-family:"Open Sans";
    font-size: 16px;
    font-weight: normal;
    margin: 15px 0 0 40px;
    text-transform: uppercase;
    display: block;
  }
  .title-middle-header{

  }
</style>
