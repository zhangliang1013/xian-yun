<template>
  <div class="header">
    <!-- logo部分 -->
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 导航栏部分 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录部分 -->
      <div class="login">
        <span>消息</span>

        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
              {{ $store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 没登录状态展示的消息 -->
        <nuxt-link to="/user/login" v-else>登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.commit('user/getData',{
        token : '',
        user : {}
      })
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  width: 1000px;
  min-width: 1000px;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0, 3px, 3px, #ccc;
  margin-bottom: 20px;
}
.row-bg {
  // margin: 0,auto;
  width: 1000px;
  min-width: 1000px;
  .logo img {
    width: 156px;
    height: 42px;
    display: block;
  }
  .navs {
    flex: 1;
    a {
      height: 57px;
      display: block;
      padding: 0 20px;
      margin-left: 20px;
      box-sizing: border-box;
      &:hover {
        color: #409eff;
        border-bottom: 3px solid #409eff;
        //    background-color: #409eff;
      }
    }
    .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
  .login {
    span {
      margin-right: 30px;
    }
  }
}
.el-dropdown-link {
  margin-left: 20px;

  &:hover {
    img {
      border-color: #409eff;
    }
  }

  a {
    display: block;
  }

  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    border: 2px #fff solid;
    border-radius: 50px;
  }
}

.account-link {
  font-size: 14px;
  margin-left: 10px;
  color: #666;

  &:hover {
    color: #409eff;
    text-decoration: underline;
  }
}
</style>