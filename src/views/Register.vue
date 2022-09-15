

<template>
  <el-row class="bg">
    <el-col :xs="24" :sm="12" :xl="12" class="login-box">
      <el-form :model="user" ref="user" status-icon label-width="100px">
        <el-form-item><span>注册</span></el-form-item>
        <el-form-item label="邮箱" prop="email"
                      :rules="rules.email">
          <el-input v-model="user.email" placeholder='请输入正确格式的邮箱' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
                      :rules="rules.password">
          <el-input type="password" v-model="user.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword"
                      :rules="rules.confirmPassword">
          <el-input type="password" v-model="user.confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code"
                      :rules="rules.code">
          <el-input v-model="user.code" maxlength="6" autocomplete="off">
            <el-button type="primary" size="small" :loading="loading" @click="sendCode" plain>
              {{ loadText }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="to-register" type="primary" @click="toRegister" :loading="registerLoading">立即注册
          </el-button>
          <el-button class="to-login" @click="
          toLogin" plain>登录</el-button>
        </el-form-item>
      </el-form>
      <div  class="other-way">
        <h3>其他方式登录</h3>
        <div>
          <li><a href="javascript:void(0)"><i class="icon-qq"></i>QQ登录</a></li>
          <li><a href="javascript:void(0)"><i class="icon-blog"></i>微博登录</a></li>
          <li><a href="javascript:void(0)"><i class="icon-wechat"></i>微信登录</a></li>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name : 'register',
    data: function(){
      return {
        loading:false,
        registerLoading:false,
        loadText:'发送验证码',
        timeClock: null,
        user:{
          email:'',
          password:'',
          confirmPassword:'',
          code:''
        },

        rules:{
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          
          confirmPassword:[
            { required: true, message: '请输入确认密码', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      
      toLogin() {
        this.$router.push({name:'login'})
      },

      
      sendCode(){
        let _ts = this;
        _ts.timerHandler();
        let email = _ts.user.email;
        if (!email) {
          return false;
        }

        let data = {
          email:email
        }
        _ts.axios.$get('/get-email-code',{params:data})
        .then(res => {
          if (res.message) {
            _ts.$message(res.message);
          }
        })
        .catch(error => {
          _ts.$message.error('验证码发送失败，请检查是否正确!'+ error.message)
        })
      },

      timerHandler(){
        let _ts = this;
        _ts.$set(_ts,'loading',true);
        let times = 30;
        _ts.timeClock = setInterval(() => {
          times--;
          _ts.$set(_ts,'loadText', times + 'S');
          if (times==0) {
            clearInterval(_ts.timeClock);
            _ts.$set(_ts,'loading',false);
            _ts.$set(_ts,'loadingText','发送验证码');
          }
        }, 1000);
      },

      toRegister(){
        let _ts = this;
        _ts.$refs.user.validate(valid => {
          if(valid) {
            _ts.$set(_ts,'registerLoading',true);
            setTimeout(() => {
              _ts.$set(_ts,'registerLoading', false)
            }, 2000);

            _ts.axiox.$post('/register', _ts.user)
            .then(res => {
              _ts.$set(_ts,'registerLoading',false);
              if(res) {
                _ts.$message({
                  showClose: true,
                  message:'注册成功!',
                  type:'success'
                });
                _ts.$router.push({name:'home'})
              }
            })
            .catch(error => {
              _ts.$message.error(error.message)
            })

          } else {
            return false;
          }
        });
      },      
    }
  }
</script>
<style src="@/assets/css/icon.css"></style>
<style>
  

.login-box{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 10px 15px;
}


.other-way{
  width: 100%;
  max-width: 320px;
  margin: 20px auto;
  font-size: 14px;
}

.bg {
  background-color: #F6F7F8;
  padding-top: 10%;
}

.other-way li {
  width: 33.333%;
  display: block;
  float: left;
}

.to-register{
  width: 60%;
}

.to-login {
  width: 32%; 
}


/*  没有使用 elementUI之前的自写样式

.login-box{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 10px 15px;
}

h3.title{
  text-align: center;
  padding: 8px;
  font-weight: 500;
}

.clear{
  clear: both;
}

.login-form{
  max-width: 320px;
  background-color: aliceblue;
  margin: 20px auto;
}

.user-name, .user-pass, .user-email, .user-tel, .verification {
  position: relative;
  height: 42px;
  margin-bottom: 5px;
}

form label {
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: black;
  background: #fff;
  text-align: center;
  top: 1px;
  left: 1px
}

form input {
  font-size: 14px;
  line-height: 18px;
  height: 42px;
  width: 100%;
  padding: 11px 8px 11px 50px;
  border: 1px solid #fff;
}

.note-pass{
  max-width: 320px;
  margin: 15px auto;
  font-size: 14px;
}

.note-pass a {
  color: blue;
  text-decoration: none;
  float: right;
}

.login{
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.login input {
  width: 100%;
  font-size: 14px;
  background-color: dodgerblue;
}

.other-way{
  width: 100%;
  max-width: 320px;
  margin: 20px auto;
  font-size: 14px;
}

.other-way li {
  width: 33.333%;
  display: block;
  float: left;
}

.other-way span {
  display: none;
}

@media screen and (min-width: 640px) {
  form, .login, .other-way {
    max-width: 640px;
    margin: 20px auto;
  }

  .other-way span {
    display: inline-block;
  }

  .login input {
    width: 100%;
    font-size: 16px;
  }
}

@media screen and (min-width: 1025px) {

  .login-box, .login-box2 {
    width: 100%;
    max-width: 360px;
    height: 430px;
    position: absolute;
    margin-top: 20px;
    margin-left: 0px;
    background: #f8f8f8;
    right: 2%;
    padding: 10px 20px;
  }

  .login-box2 {
    height: 430px;
  }
}


*/
</style>

