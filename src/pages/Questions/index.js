import React ,{useEffect, useState} from "react";
import "./styles.css";
import ReactCountdownClock  from 'react-countdown-clock';
import { userActions } from "../../store";
import { useDispatch,useSelector } from "react-redux";
import { fetchQuestions,updateResults } from "../../store/slices/userSlice";
let points = 0
function QuestionPage(){
    useEffect(()=>{
        dispatch(fetchQuestions())
    }
    ,[])
   
    let dispatch = useDispatch()
    let {allQuestions,userId} = useSelector(state=>state.user)
    const[valueSelected,setValueSelected] = useState({})
    const [showTimer,setShowTimer] = useState(true)
    const [disableRdBtn , setDisabled] = useState(false)
    const [showCorrectAnswer, setShowCorrectAnswer
    ] = useState(false)
    
    const[questionBank,setQuestionBank] = useState(allQuestions)
    useEffect(()=>{
        setQuestionBank(allQuestions)
    },[allQuestions])
    useEffect(()=>{
        if(questionBank.length>0){
            setShowTimer(true)
        }
    },[questionBank])
    const handleRadioButton = (e)=>{
        try{
            if (e.currentTarget.checked){
                let key = e.currentTarget.value
                let val = e.currentTarget.checked
                let temp = {}
                temp[key] = val
               setValueSelected(temp)
            }
        }
        catch(err){
            console.log("error while handling radiobtn :: ",err)
        }
    }

    const handleAnswer = ()=>{
        try{
            setShowTimer(false)
            setShowCorrectAnswer(true)
            setDisabled(true)
            if(questionBank.length > 0){
                handleResults()
            }

        }
        catch(err){
            console.log("error in handleAnser",err)
        }
    }
    const handleResults = (updateTable=false)=>{
        let questions = [...questionBank]
        let currentQuestion = questions.splice(0,1)[0]
        let answer = JSON.stringify(currentQuestion.correctAnswer)
        try{
            if(Object.keys(valueSelected).includes(answer)){
                    points += currentQuestion.points
            }
            else{
                if(points > currentQuestion.points){
                    points = points - 5
                }
                else{
                    points = 0
                }
            }
            let datatoSend = {"points":points,"updateTable":false}
            if(updateTable){
                datatoSend['updateTable'] = true
                dispatch(updateResults({"user":userId,"marks":points}))
            }
        }
        catch(err){
            console.log("error in handleResults::: ",err)
        }
    }
    const handleNext = ()=>{
        try{
            let questions = [...questionBank]
            questions.splice(0,1)
            setDisabled(false)
            setShowTimer(false)
            setShowCorrectAnswer(false)
            setValueSelected({})
            if(questions.length > 0){
                handleResults()
                setQuestionBank(questions)
            }
            else{
                handleResults(true)
            }
        }
        catch(err){
            console.log("error in handleNext :: ",err)
        }
    }
            return <>
                {
                    questionBank.length>0? <div className="Questions__pageContainer">
                    <div className="Questions__headerQuestion">
                    <div><span>{questionBank[0].question}</span></div>
                        {showTimer ? <ReactCountdownClock 
                            seconds = {questionBank[0].timeForAnswerInSeconds}
                            alpha={0.9}
                            color={"#FF5733"}
                            size={100}
                            onComplete={()=>{handleAnswer()}}
                        />
                    : <span className="Questions__userPoints">
                        {points}
                    </span>}
                    </div>
                    <div className="Questions__answerMarks">
                        {questionBank[0].answers.map((item,index)=>{
                            return <div key={"index__"+index} className="Questions__answerRadioBtn">
                                {questionBank[0].correctAnswer}
                            <div className={showCorrectAnswer && index === questionBank[0].correctAnswer ?"success-highlighter": "" }>
                                <input type={"radio"} id={index+"_0"} name="radio_answer" value={index} checked={valueSelected[index] ? valueSelected[index]:false}  onChange={(e)=>{handleRadioButton(e)}} disabled={disableRdBtn}></input>
                                <label htmlFor={index+"_0"}>{item}</label>
                            </div>
                        </div>
                        })}
                        
                        <div className="Questions__buttonClass">
                                <button onClick={handleNext}> Next </button>
                        </div>
                    </div>
        
                </div>
                    :
                    <></>
                }
            
            </>
}

export default QuestionPage;