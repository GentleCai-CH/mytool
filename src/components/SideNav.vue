<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-11 18:00:36
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-14 22:41:06
 * @FilePath: \mytool\src\components\SideNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>
    <div class="title">
      <span>
        <el-button class="menu-button" icon="el-icon-menu" @click="isMenuOpen=true" size="small" plain>菜单</el-button>
      </span>
      <span class="avatar">
        <el-button icon="el-icon-user-solid" size="mini" round></el-button><a href="javascript:void(0)">用户名</a>
      </span>
    </div>
    <el-drawer
      title="菜单" 
      :visible.sync="isMenuOpen" 
      direction="rtl" 
      size="30%">
      <el-menu default-active="path" router>
        <div v-for="item in slide_menu" :key="item">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <template slot="title">{{item.title}}</template>
          </el-menu-item>
        </div>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name : 'sideNav',
    data() {
      return {
        isMenuOpen:false,
        path:'',
        slide_menu:[
          {title:'首页',icon:'el-icon-reading',path:'/'},
          {title:'帐号注册',icon:'el-icon-user-solid',path:'/register'},
          {title:'帐号登录',icon:'el-icon-mobile',path:'/login'},
          {title:'编辑页面',icon:'el-icon-edit',path:'/edit'},
          {title:'帐号退出',icon:'el-icon-warning',path:'/home'}
        ]
      }
    },

    methods: {

      /** 没有使用 <el-drawer>之前
       * 
       * menuChange() {
        let _ts = this;
        _ts.menuOpen = ! _ts.menuOpen;
        
        //改变菜单图标 和 显隐
        this.menuOpen
        ? _ts.$set(_ts,'menuIcon','el-icon-circle-close-outline') //叉号图标
        : _ts.$set(_ts,'menuIcon','el-icon-menu'); //菜单图标

        _ts.zIndex
        ? "menu-open"
        : "menu-close";
      }
       */
    }
  }
</script>

<style>

.title {
  position: absolute;
  top:0px;
  left:10%;
  background-color: transparent;
  display:flex;
  align-content: flex-start;
  align-items: center;
  z-index:10;
}

.menu-button {
  margin: 3px 10px;
}

.avatar {
  margin:6px 20px;
}

.avatar a {
  margin: 8px 0 0 8px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  text-decoration: none;
}

el-drawer {
  background-color: aliceblue;
}

 /**
 应用了 <el-drawer>,不用下面的了
  
  .menu-open {
    z-index: 5;
  }

  .menu-close {
    z-index: -1;
  }
 
 */
</style>
