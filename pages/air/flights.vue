<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
       <FlightsFilters></FlightsFilters>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsLtem v-for="(item,index) in dataList " :key="index" :data="item"></FlightsLtem>
        <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3, 5, 8, 12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="flightsAmount.total"
      ></el-pagination>
      </div>

      

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsLtem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters"

export default {
  components: {
    FlightsListHead,
    FlightsLtem,
    FlightsFilters
  },
  data() {
    return {
      //服务器台返回的总数据
      flightsAmount: {},
      // 表示第几页
      pageIndex : 1,
      // 每页显示多少条
      pageSize : 3
    };
  },
  methods : {
    // 改变一页显示条数改变的函数
    handleSizeChange(val){
      // console.log(val)
      this.pageSize = val;
    },
    // 改变第几页的函数
    handleCurrentChange(val){
      //  console.log(val)
      this.pageIndex = val;
    }
  },
  computed : {
     dataList(){
      //this.flightsAmount.flights.splice(0,5);
      if(!this.flightsAmount.flights){
        return [] ;
      }
      // slice表示从哪里拿到哪里结束 生成新数组
      const arr = this.flightsAmount.flights.slice(( this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize);
      return arr ;
     }
  },
  mounted() {
    // 获取航班信息
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res)
      const { data } = res;
      this.flightsAmount = data;
      console.log(this.flightsAmount);
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
// 分页样式
.el-pagination{
  text-align: center;
}
</style>