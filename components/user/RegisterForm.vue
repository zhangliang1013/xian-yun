<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- 用户账户 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <!-- 用户名 -->
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="用户名" v-model="form.nickname"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>
    <!--   -->
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword "></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  // 输入密码的自定义验证
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    // 输入确认密码的自定义验证
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 输入验证账户名的自定义验证
    var validateUsername = (rule,value,callback) =>{
        if(value == ''){
             callback(new Error("请输入账户名"));
        }else if(/^[1]\d{10}$/.test(value)){
              callback()
        }else {
            callback(new Error("输入的账户名不合法"));
        }
    }
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validateCheckPass, trigger: 'blur' }]
      }
    };
  },
  methods: {
    //点击验证码
    handleSendCaptcha() {
      // this.$axios({
      //   url : '/captchas',
      //   method : 'post',
      //   data : {
      //      tel: this.form.username
      //   }
      // }).then(res =>{
      //   console.log(res)
      // })
      // vuex将一部操作封装起来
      this.$store.dispatch('user/captchas',this.form.username).then( res =>{
        this.$message.success('模拟验证码为  '  +   res.data.code);
      })
    },
    // 点击注册按钮
    handleRegSubmit() {
       this.$refs.form.validate((valid) => {
          if (valid) {
             const {checkPassword ,...data} = this.form
            //  this.$axios({
            //    url : '/accounts/register',
            //    method : 'post',
            //    data 
            //  }).then(res =>{
            //    console.log(res)
            //    this.$store.commit('user/registerData',res.data)
            //  })
            this.$store.dispatch('user/register',data).then( ()=>{
              this.$message.success('注册成功！');
              this.$router.push('/')
            })
          } else {
           this.$message.error("温馨提示！注册出错了哦");
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