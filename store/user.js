// 将登录成功后的数据存储到这里
// export const state = ()=> ({
//     userInfo : {
//         token : '',
//         user : {},
//     }
// })

export const state = ()=>{
  return {
    userInfo : {
      token : '',
      user : {},
  }
  }
}

// 将登录成功的数据赋值到userInfo里面
export const mutations = {
    getData(state , data){
       state.userInfo = data
    // console.log(state.userInfo)
    // console.log(data)
    }
}

// 储存异步操作
// export const actions={
//     login({commit},data){
//       return  this.$axios({
//             url: "/accounts/login",
//             method: "post",
//             data
//           }).then(res => {
//             const {data} = res;
//             console.log(data)
//             // this.$store.commit('user/getData',res.data)
//             commit('getData', data);
//             // return data
//           });
//     }
// }

export const actions={
  login(store,data){
    return  this.$axios({
          url: "/accounts/login",
          method: "post",
          data
        }).then(res => {
          const {data} = res;
          console.log(data)
          // this.$store.commit('user/getData',res.data)
          store.commit('getData', data);
          // return data
        });
  }
}