<template>
  <div class="login_container">

    <el-form class="login-form" ref="login-form" :model="user" :rules="loginRules">
      <div class="login_header"></div>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model='checked'>我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' class="login-btn" :disabled='!checked' @click="onLogin" :loading='loginLoading'>登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { login } from '../../api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: false,
      loginLoading: false,
      loginRules: {
        mobile: [{ pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式不正确！', trigger: 'change' },
          { required: true, message: '手机号不能为空！', trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空！', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确！', trigger: 'change' }]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate((valid, err) => {
        if (!valid) {
          return false
        }
        this.submitLogin()
      })
    },
    submitLogin () {
      this.loginLoading = true
      login(this.user).then(res => {
        // console.log(res)
        this.loginLoading = false
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$message.success('登录成功！！')
        this.$router.push('/')
      })
        .catch(err => {
          this.loginLoading = false
          console.log(err)
          this.$message.error('手机号或验证码错误！！')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/login_bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-form{
  background-color: #fff;
  padding: 20px  50px;
  min-width: 300px;

  .login_header{
    width: 300px;
    height: 57px;
    background: url('../../assets/logo_index.png') no-repeat;
    margin-bottom: 30px;
  }

  .login-btn{
    width: 100%;
  }
  }

}

</style>
