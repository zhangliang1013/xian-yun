<template>
    <div class="flight-item" >
        <div @click='isShow = !isShow'>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info" >
                <el-col :span="6">
                    <span>{{data.airline_name}} </span> {{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name}} {{data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{TimeSpan}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                            <span>{{data.dst_airport_name}} {{data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{data.base_price / 2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="isShow" >
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle" v-if="isShow">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
                     v-for="(value , index) in data.seat_infos" :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{value.name}}</span> | {{value.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{value.settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click='handleAirClick(value)'>
                            选定
                            </el-button>
                            <p>剩余：{{value.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 出发时间
        startTime : 0,
        // 到达时间
        endTime : 0,
        // 是否展示航班详情
        isShow : false
        }
    },
    props: {
        // 数据
        data: {
            type: Object,
            // 默认是空数组
            default: {}
        }
    },
    // 计算航班起飞至到达的时间差
    computed: {
        TimeSpan(){
        //  console.log( this.data.dep_time.split(':'))
        // 收集出发时间的数组
        let start =  this.data.dep_time.split(':');
        this.startTime = start[0] * 60 + Number(start[1]);

        // 收集到达时间的数组
        let end = this.data.arr_time.split(':');
        this.endTime = end[0] * 60 + Number(end[1]);

        if(this.endTime < this.startTime){
            this.endTime += 24 * 60;
        }
         
        // 中间的时间差
        let TimeSpanNum = this.endTime - this.startTime;

        const hour =  Math.floor(TimeSpanNum / 60);
        const sec =   TimeSpanNum % 60;

        return `${hour}时${sec}分`;
        }
    },
    methods : {
        // 点击选定的函数
        handleAirClick(item){
        //console.log(item)
        // console.log(this.data)
        //  跳转到订单页
         this.$router.push({
             path : '/air/order',
             query : {
                 id : this.data.id,
                 seat_xid : item.seat_xid
             }
         })
         this.$message.success('请输入订单信息')
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>