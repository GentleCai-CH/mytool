/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-02-12 22:20:06
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-14 04:41:46
 * @FilePath: \shop\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/views/Home.vue'
import Edit from '@/views/Edit.vue'
import Folder from '@/views/Folder.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

Vue.use(Router)

var router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '介绍'
      }
    },{
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta: {
        title: '编辑页面'
      }
    },{
      path: '/folder',
      name: 'folder',
      component: Folder,
      meta: {
        title: '文件'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },{
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册'
      }
    }
  ],
  
  //跳转页面后置顶
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {x:0,y:0}
    }
  }
})


export default router
router.beforeEach((to, from, next) => {
  /* 路由发生变化时修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
