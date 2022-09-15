
<template>
  <div>
    <SideNav></SideNav>
    <div class="home-container">
      <div class="home-page">
        <div><span class="home-title">My Editor</span></div>
        <div>
          <el-divider></el-divider>
        </div>
        <div class="home-slide">
          <el-carousel height='500px'>
            <el-carousel-item v-for="item in showImg" :key="item.src">
              <el-image :src="item.src"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <el-divider></el-divider>
        </div>
        <h5>欢迎使用！</h5>
        <a href="https://www.baidu.com/" target="_blank">打开GitHub,未修改</a>
      </div>
      
    </div>
  </div>
</template>


<script>
import SideNav from "@/components/SideNav"
export default {
  name : 'home',
  components:{
  'SideNav' : SideNav,},
  data() {
    return {
      showImg:[
        {src:require('@/assets/image/001.png') },
        {src:require('@/assets/image/002.png') },
        {src:require('@/assets/image/001.jpg') },
        {src:require('@/assets/image/002.jpg') },
        //  {src : '@/assets/image/002.jpg'} 不起效
      ]
    }
  },

}

</script>

<style>

.home-container {
  position: absolute;
  top:0px;
  left:10%;
  width:80%;
  height: 100%;
  background-color: rgb(227, 225, 225);
  display: flex;
  align-self:center;
}

.home-page {
  font-size: 30px;
  color: #90e6cc;
  width:100%;
  margin: auto;
 
}

.home-title {
  width:100%;
  margin: 0 auto;
}

.home-slide {
  width:100%;
  margin: 5px auto;
}

h5 {
  width:100%;
  height:10%;
  margin: 15px auto;
}

el-divider {
  width:100%;
  margin: auto;
}

a {
  width:100%;
  height: 10%;
  font-size: 20px;
  color:rgb(25, 136, 121);
  text-decoration: none;
  margin: auto;
}

a:hover {
  cursor:pointer;
}

</style>
