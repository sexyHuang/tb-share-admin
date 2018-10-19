<template>
    <div class="login">
        <div class="login-box">
            <h1>登录</h1>
            <el-input v-model="accout" placeholder="请输入账号"></el-input>
            <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
            <el-checkbox v-model="checked">记住登录状态</el-checkbox>
            <el-button type="primary" :disabled="!password" @click="doLogin">登录</el-button>
            
        </div>

    </div>
</template>

<script>
import {login} from '@/common/login';
export default {
  data() {
    return {
      accout: '',
      password: '',
      checked: false
    };
  },
  methods: {
      doLogin() {
          let res = login(this.accout,this.password,this.checked);
          if(res.error){
              this.$message.error(res.error);
          } else {
              this.$message.success('登录成功');
              this.$router.replace('/');
          }
      }
  },
};
</script>

<style scoped lang='scss'>
h1 {
  text-align: center;
  letter-spacing: 0.1em;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &-box {
    width: 30%;
    margin-top: -10vh;
    min-width: 300px;
    max-width: 450px;
    padding: 20px;

    border-radius: 10px;
  }
}
.el-input {
  margin-bottom: 10px;
}
.el-button {
  width: 100%;
  margin-top: 10px;
}
.el-checkbox {
}
</style>