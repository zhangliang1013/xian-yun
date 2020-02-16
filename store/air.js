export const state = ()=>{
   return {
       infoData : [
        //    {
        //     departCity: "广州",
        //     departCode: "",
        //     destCity: "上海",
        //     destCode: "",
        //     departDate: "2019-10-20"
        //    }
       ]
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
    }
}