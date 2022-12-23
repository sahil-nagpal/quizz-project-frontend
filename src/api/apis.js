import apiClient from './index'

export const loginUser = async(data)=>{
    let res = await apiClient.post("/user/user-login",data)
    if(res.status == 200){
        return res.data
    }
    else{
        return {}
    }
}

export const getQuestions = async()=>{
    try{
        let res = await apiClient.get("/questions")
        if(res.status == 200){
            return res.data
        }
        else{
            return {}
        }
    }
    catch(err){
        console.log("error in getQuestions :: ",err)
    }
}

export const getResults = async()=>{
    try{
        let res = await apiClient.get("/results")
        if(res.status == 200){
            return res.data
        }
        else{
            return{}
        }
    }
    catch(err){
        console.log("error in getResults :: ",err)
    }
}

export const updateResults = async(data)=>{
    try{
        let res = await apiClient.patch(`/results/${data.user}`,data)
        if(res.status == 200){
            return res.data
        }
        else{
            return{}
        }
    }
    catch(err){
        console.log("error in updateResults::: ",err)
    }
}