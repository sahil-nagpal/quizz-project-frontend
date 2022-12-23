import React ,{useState,useRef} from 'react';
import './style.css'
import { useDispatch ,useSelector} from 'react-redux';
import {userActions} from '../../store';
import { loginUser } from '../../store/slices/userSlice';
let firstNum = Math.ceil(Math.random()*11)
let secondNum = Math.ceil(Math.random()*11)
const Login = ()=>{
    const usrRef = useRef()
    const nameRef = useRef()
    const {nameError,calcError} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const[disableBtn,setDisableBtn] = useState(false)
    const handleUserSubmission = ()=>{
        setDisableBtn(true)
       let value = parseInt(usrRef.current.value)
       let name = nameRef.current.value
       if(value !== (firstNum+secondNum)){
           dispatch(userActions.setCalcError({"value":true}))
           setDisableBtn(false)
            return;
       }
       else if(name === ""){
        dispatch(userActions.setNameError({"value":true}))
        setDisableBtn(false)
        return;
       }
       dispatch(loginUser({"name":name}))
    }
    return <div className='Login__containerClass'>
        <div className='Login__headerbox'>
            <span>Quiz feed</span>
        </div>
        <div className='Login__Styleclass'>
            <div>
                <input ref={nameRef} onChange={()=>{dispatch(userActions.setNameError({"value":false})); setDisableBtn(false) }} className={nameError?"error-highlighter":""} placeholder='type user name'></input>
            </div>
            <div className='Login__inputs'>
                <label>What is {firstNum} + {secondNum} ?</label>
                <input ref={usrRef} type={"number"} onChange={()=>{ dispatch(userActions.setCalcError({"value":false})); setDisableBtn(false) }} placeholder={"type your answer here"} className={calcError?"error-highlighter":""}></input>
            </div>
            <div className='Login__SubmitButton'>
                <button onClick={handleUserSubmission} disabled={disableBtn}>
                    Login
                </button>
            </div>
        </div>
    </div>
}
export default Login;