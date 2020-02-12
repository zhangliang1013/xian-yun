<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead></FlightsListHead>
                
                
                <!-- 航班信息 -->
                 <FlightsLtem v-for="(item,index) in flightsAmount.flights " :key='index'
                 :data='item'></FlightsLtem>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead';
import FlightsLtem from '@/components/air/flightsItem'


export default {
  components :{
    FlightsListHead,FlightsLtem
  },
    data(){
        return {
          //  手机后台返回的总数据 
          flightsAmount : {} 
        }
    },
    mounted(){
      // 获取航班信息
      this.$axios({
        url : '/airs',
        params : this.$route.query
      }).then(res =>{
        // console.log(res)
        const {data} = res;
        this.flightsAmount = data;
        console.log(this.flightsAmount)
      })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>