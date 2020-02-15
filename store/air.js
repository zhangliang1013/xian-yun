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
        state.infoData.push(data);
        console.log(state.infoData);
    }
}