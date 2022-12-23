import { createSlice, current } from "@reduxjs/toolkit";
import * as API from '../../api/apis.js';
import { userActions } from "../index.js";
let initialState = {
    nameError : false,
   calcError : false,
    isUserLoggedIn:false,
    userPoints:0,
    results:[{
        "user":{"name":"sahil","_id":231},
        "marks":10
    },
    {
        "user":{"name":"arjuna","_id":992},
        "marks":30
    },],
    finalResult:false,
    allQuestions : []
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setNameError:(state,action)=>{
            state.nameError = action.payload.value
        },
        setCalcError:(state,action)=>{
            state.calcError = action.payload.value
        },
        checkUserState : (state,action)=>{
            try{
                if(action.payload.success){
                    state.isUserLoggedIn = true
                    state.userId = action.payload.data
                    window.localStorage.setItem("userLoggedIn",true)
                }
            }
            catch(err){
                console.log("error in setIsUserLoggedIn :: ",err)
            }
        },
        updateUserPoints : (state,action)=>{
            try{
                state.userPoints = action.payload.points
                if(action.payload.updateTable){
                    state.finalResult = true
                }
            }
            catch(err){
                console.log("error in updateUserPoints :::: ",err)
            }
        },
        setAllQuestions : (state,action)=>{
            state.allQuestions = action.payload.data
        },
        setResults : (state,action)=>{
            state.results = action.payload.data
        }
    }
})
export const loginUser = (details)=>{
    return async(dispatch)=>{
        let response = await API.loginUser(details)
        if(response.success){
            dispatch(userSlice.actions.checkUserState({"success":true,"data":response.userId}))
        }
        else{
            dispatch(userSlice.actions.setNameError({"value":true}))
        }
    }
}

export const fetchQuestions = ()=>{
    return async(dispatch)=>{
        let response = await API.getQuestions()
        if(response.success){
             dispatch(userSlice.actions.setAllQuestions({"data":response.questions}))

        }
        // else{
        //     dispatch(userSlice.actions.setNameError({"value":true}))
        // }
    }
}

// export const fetchQuestions = async()=>{
//     console.log(">>>>>>>>>>>>>22")
//     return async(dispatch)=>{
//         console.log(">>>>>>>>>>>>>>#")
//         // console.log(">>>>>>>>>>>>>>>>3333")
//         // let response = await API.getQuestions()
//         // console.log("response ::: ",response)
//         // if(response.success){
//         // }
//     }
// }

export const fetchResults = ()=>{
    return async(dispatch)=>{
        let response = await API.getResults()
        if(response.success){
            dispatch(userSlice.actions.setResults({"data":response.results}))
        }
    }
}

export const updateResults = (data)=>{
    return async(dispatch)=>{
        console.log("data ::::::::::::::: ",data)
        let response = await API.updateResults(data)
        if(response.success){
            dispatch(userActions.updateUserPoints({"data": response.marks,"updateTable":true}))
        }
    }
}


export default userSlice;
