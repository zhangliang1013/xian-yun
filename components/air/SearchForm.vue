<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <!-- 出发城市输入框 -->
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <!-- 到达城市输入框 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="handleDestCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date" placeholder="请选择日期"
        v-model="form.departData"
         style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>

      <!-- 换字点击事件 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      // 表单的字段
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      // 出发城市列表
      departData: [],
      // 到达城市列表
      destData: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("暂时不支持往返操作！", "温馨提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    
     //封装出发和到达城市value变化的函数
    // querySearch(value){
    //  return    this.$axios({
    //     url: "/cities",
    //     params: {
    //       name: value
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     const { data } = res.data;
    //     const newData = data.map(v => {
    //       v.value = v.name.replace("市", "");
    //       return v;
    //     });
    //     return newData
    //   })
    // },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，callback是回调函数，接收要展示的列表
    queryDepartSearch(value, callback) {
      if (value === "") {
        callback([]);
        return;
      }
  //  没封装之前的函数
      // this.$axios({
      //   url: "/cities",
      //   params: {
      //     name: value
      //   }
      // }).then(res => {
      //   // console.log(res)
      //   const { data } = res.data;
      //   const nameData = data.map(v => {
      //     v.value = v.name.replace("市", "");
      //     return v;
      //   });
      // });

          //函数的封装方式
      //  this.querySearch(value).then(newData => {
      //    this.departData = newData;
      //     callback(newData);
      //  })
     
      // vuex的封装方式
      this.$store.dispatch('user/querySearch',value).then(newData =>{
        this.departData = newData;
        callback(newData);
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort
    },

   //出发城市市区焦点是触发
   handleDepartCity(){

     if(this.form.departCity === ''){
       this.departData = [];
     }

      if(this.departData.length === 0){
          return;
      }
      this.form.departCity = this.departData[0].value;
      this.form.departCode = this.departData[0].sort;
   },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，callback是回调函数，接收要展示的列表
    queryDestSearch(value, callback) {
      if(!value){
        callback([]);
          return;
      }
    //  没封装之前的函数
      // this.$axios({
      //     url :'/cities',
      //     params : {
      //         name : value
      //     }
      // }).then(res =>{
      //     const {data} = res.data
      //     const newData = data.map( v =>{
      //         v.value = v.name.replace('市','');
      //         return v;
      //     })
      //     this.destData = newData;
      //     callback(newData)
      // })

      //  函数封装的方式
      // this.querySearch(value).then(newData =>{
      //    this.destData = newData;
      //     callback(newData)
      // }) 

      // vuex中store中封装异步操作
      this.$store.dispatch('user/querySearch',value).then(newData =>{
        this.destData = newData;
         callback(newData)
      })
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
        this.form.destCity = item.value;
        this.form.destCode = item.sort;
    },
    
    // 到达城市失去焦点触发
    handleDestCity(){
     if(this.form.destCity === ''){
       this.destData = []
     }

      if(this.destData.length=== 0){
          return;
      }
       this.form.destCity = this.destData[0].value;
        this.form.destCode = this.destData[0].sort;
    },
    // 确认选择日期时触发
    handleDate(value) {
        this.form.departDate = moment(value).format("YYYY-MM-DD")
    },

    // 触发和目标城市切换时触发
    handleReverse() {
        const {departCity,departCode,destCity, destCode} = this.form

        this.form.departCity = destCity;
        this.form.departCode = destCode

        this.form.destCity = departCity; 
        this.form.destCode = departCode;

        console.log(123)
        console.log(this.form)
    },

    // 提交表单是触发
    handleSubmit() {
        // console.log(this.form)
        if(this.form.departCity.trim().length === 0){
            this.$message.error('出发城市不能为空！')
            return;
        }
        if(this.form.destCity.trim().length === 0){
            this.$message.error('到达城市不能为空！')
            return;
        }
        if(this.form.departDate.trim().length === 0){
            this.$message.error('出发日期不能为空！')
            return;
        }
        
        this.$message.success('机票搜索成功！')
        this.$router.push({
            path : '/air/flights',
            query : this.form
        })
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
