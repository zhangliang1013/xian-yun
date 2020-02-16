export const state = ()=>{
   return {
    //    储存历史查询记录
       infoData : [
        //    {
        //     departCity: "广州",
        //     departCode: "",
        //     destCity: "上海",
        //     destCode: "",
        //     departDate: "2019-10-20"
        //    }
       ],
    //储存订单信息 
    orderInfo : {
        seat_infos : {}
    },
    // 储存机票总价
    allPrice : 0
   }
}

export const mutations = {
    getAirList(state,data){
        state.infoData.unshift(data);
        // 控制历史查询只显示5条记录
        // 方法1
        //  state.infoData = state.infoData.slice(0,5);
        // 方法2
        if(state.infoData.length > 5){
            state.infoData.length = 5;
        }
        // console.log(state.infoData);
    },
    // 获取订单信息
    getOrderInfo(state,data){
        state.orderInfo = data;
        // console.log(data)
    },
    //  获取机票总价
    getAllPrice(state,data){
        state.allPrice = data
    }
}