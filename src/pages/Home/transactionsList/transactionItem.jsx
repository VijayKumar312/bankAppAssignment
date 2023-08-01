import React, {useState} from 'react'
import DeleteTransaction from "../../../popups/deleteTransaction"
import EditTransactionModal from '../../../popups/editTransaction'
import { useSelector } from 'react-redux'

function TransactionItem({item}) {
    const [deleteState, setDeleteState] = useState(false)
    const [editState, setEditState] = useState(false)
    const {loginUserId} = useSelector(state=>state.transaction)
    const updateDeleteState=()=>{
        setDeleteState(!deleteState)
    }
    const updateEditState=()=>{
        setEditState(!editState)
    }
  return (
    <>
            <li className='transactionItem'>
            <div className="imageAndText">
                <img src={item.type==='debit' ? '/transactions/debit.png' : '/transactions/credit.png'} alt={item.type} />
                <p>{item.transaction_name}</p>
            </div>
            <p className="category">{item.category}</p>
            <p className="date">{item.date}</p>
            <p className="amount"><span>{item.type==='debit' ? '-' : '+'}</span>{item.amount}</p>
            <div className="buttons">
                {loginUserId !==3 && <button onClick={()=>{setEditState(!editState)}}><img src="/transactions/edit.png" alt="EDIT" /></button>}
                {loginUserId !==3 && <button onClick={()=>{setDeleteState(!deleteState)}}><img src="/transactions/delete.png" alt="DELETE" /></button>}
            </div>                            
            </li>
        {
            deleteState && <DeleteTransaction transaction={item} deleteState={deleteState} setDeleteState={updateDeleteState} />
        }
        {
            editState && <EditTransactionModal transaction={item} editState={editState} setEditState={updateEditState} />
        }
    
    </>
         
  )
}

export default TransactionItem