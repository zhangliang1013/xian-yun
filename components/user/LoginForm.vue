<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- 用户名 -->
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <!-- 登录按钮 -->
    <el-button class="submit" type="primary" @click="loginClick">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.form
          }).then(res => {
            const {data} = res;
            console.log(data)
            // this.$store.commit('user/getData',res.data)
            this.$store.commit('user/getData', data);
          });
        } else {
          this.$message.error("温馨提示！登录出错了哦");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>