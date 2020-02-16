<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4" >
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport" >
                    <el-option
                    v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes"  >
                    <el-option
                    v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="`${item.from}:00-${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company" :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in airSizeList" :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <!-- 筛选多选条件 -->
      <div>{{airFilterList}}</div>  
    </div>
</template>

<script>
export default {
    props : {
         data : Object,
         default : {
             info: {}
         }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            // 筛选机型的数据
            airSizeList : [
                {name : '大',size : 'L'},
                 {name : '中',size : 'M'},
                  {name : '小',size : 'S'},
            ]
            
        }
    },
    // 实现条件筛选的多项筛选功能
    computed : {
       airFilterList (){
          
           const newData = this.data.flights.filter(v=>{
                // 筛选机场
                let valid = true;
                if(this.airport && v.org_airport_name !== this.airport){
                    valid = false;
                }
                
                // 筛选出发时间
                 if(this.flightTimes){
                     const start = +this.flightTimes.split(',')[0];
                     const end = +this.flightTimes.split(',')[1];
                     if(Number(v.dep_time.split(':')[0]) < start || Number(v.dep_time.split(':')[0]) >= end){
                            valid = false;
                     }
                 }

                // 筛选航空公司
                 if(this.company && this.company !== v.airline_name){
                     valid = false;
                 }
                 
                //  筛选飞机机型
                if(this.airSize && this.airSize !== v.plane_size){
                    valid = false;
                }

                return valid;
            })

         this.$emit('getData',newData)
         return '';
       }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // // console.log(value)
            //  const newData = this.data.flights.filter(v=>{
            //     return v.org_airport_name === value;
            // })
            //   this.$emit('getData',newData)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            //   const newData = this.data.flights.filter(v=>{
            //     //起飞时间的小时
            //     var hour = +v.dep_time.split(':')[0];
            //     // console.log(hour)
            //     var start = +value.split(',')[0];
              
            //     var end = +value.split(',')[1];
            
            //      return start <= hour && hour < end;
            // })
            //   this.$emit('getData',newData)
        
        },

         // 选择航空公司时候触发
        handleCompany(value){
        
            // const newData = this.data.flights.filter(v=>{
            //     return v.airline_name === value;
            // })
            //   this.$emit('getData',newData)
            
        },

         // 选择机型时候触发
        handleAirSize(value){
        //    const newData = this.data.flights.filter(v=>{
        //         return v.plane_size === value;
        //     })
        //       this.$emit('getData',newData)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= ""    ;   // 机场
            this.flightTimes="" ;  // 出发时间
            this.company= ""    ;    // 航空公司
            this.airSize= ""         //机型大小
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>