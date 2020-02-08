// 将登录成功后的数据存储到这里
export const state = ()=> ({
    userInfo : {
        token : '',
        user : {},
    }
})

// 将登录成功的数据赋值到userInfo里面
export const mutations = {
    getData(state , data){
       state.userInfo = data
    // console.log(state.userInfo)
    // console.log(data)
    }
}