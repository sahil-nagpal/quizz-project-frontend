import React,{useEffect} from 'react';
import Login from "../Auth";
import QuestionPage from '../Questions';
import ResultsTable from '../Results';
import "./index.css";
import { useSelector } from 'react-redux';
import { fetchQuestions } from '../../store/slices/userSlice';
const Layout = ()=>{
    const {isUserLoggedIn,finalResult,allQuestions} = useSelector((state)=>state.user);
    return <div className='Layout__container_page'>
        <div className='Layout__containerItems'> 
            {finalResult ? <ResultsTable/> : isUserLoggedIn ? <QuestionPage allQuestions={allQuestions}/>:<Login/>}
        </div>
        </div>
}
export default Layout;