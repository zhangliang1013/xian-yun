export const state = ()=>{
   return {
       infoData : [
        //    {
        //     departCity: "12",
        //     departCode: "",
        //     destCity: "123",
        //     destCode: "",
        //     departDate: ""
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
        state.infoData.length = 5;
        // console.log(state.infoData);
    }
}