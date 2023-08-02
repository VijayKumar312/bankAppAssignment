import { useSelector } from "react-redux"
import DeleteTransaction from "../../../popups/deleteTransaction";
import EditTransactionModal from "../../../popups/editTransaction";
import { useState } from "react";
function LastTransaction() {

  const [deleteState, setDeleteState] = useState(false)
  const [editState, setEditState] = useState(false)

  const {loginUserId, userData, allTransactions} = useSelector(state=>state.transaction)
  const {lastThreeTransactions} = userData
  let lstThreeTransactions = lastThreeTransactions.slice(0, 3)

  const updateDeleteState=()=>{
    setDeleteState(!deleteState)
  }
  const updateEditState=()=>{
    setEditState(!editState)
  }

  const customDate=(date)=>{
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate
  }
  const renderLastTransactions=(item)=>(
    <li className='transactionItem' key={item.id}>
                    <img src={item.type==='debit' ? '/transactions/debit.png' : '/transactions/credit.png'} alt={item.type} />
                    <p>{item.transaction_name || item.name}</p>
                    <p>{item.category}</p>
                    <p>{customDate(item.date)}</p>
                    <p><span>{item.type==='DEBIT' ? '-' : '+'}</span>{item.amount}</p>
                    {loginUserId !==3 && <button onClick={()=>{setEditState(!editState)}}><img src="/transactions/edit.png" alt="EDIT" /></button>}
                    {loginUserId !==3 && <button onClick={()=>{setDeleteState(!deleteState)}}><img src="/transactions/delete.png" alt="DELETE" /></button>}
                    {
                        deleteState && <DeleteTransaction transaction={item} deleteState={deleteState} setDeleteState={updateDeleteState} />
                    }
                    {
                        editState && <EditTransactionModal transaction={item} editState={editState} setEditState={updateEditState} />
                    }
                </li>
  )
  return (
    <div className='transactionsContainer'>
        <h1>Last transaction</h1>
        <ul className='transactionList'>
            {
              allTransactions.length>0 ? 
              allTransactions.slice(0, 3).map(item=>(renderLastTransactions(item))) :
              lstThreeTransactions.map(item=>renderLastTransactions(item))
            } 
        </ul>
        
    </div>
  )
}

export default LastTransaction