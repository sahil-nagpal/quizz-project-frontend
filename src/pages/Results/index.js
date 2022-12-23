import React ,{useEffect} from "react";
import "./style.css";
import { useDispatch,useSelector } from "react-redux";
import { fetchResults } from "../../store/slices/userSlice";
function ResultsTable(){
    const dispatch = useDispatch()
    const {results} = useSelector(state => state.user);
    useEffect(()=>{},[
        dispatch(fetchResults())
    ],[])
    return <>
        <table className="ResultsTable__tableContainer">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
            </thead >
            <tbody>
                {results.map((item,index)=>{
                        return <tr key={index}>
                        <td>{item.user.name}</td>
                        <td>{item.marks}</td>
                    </tr>
                    })
                }
            </tbody>
        </table>
    </>
}
export default ResultsTable;