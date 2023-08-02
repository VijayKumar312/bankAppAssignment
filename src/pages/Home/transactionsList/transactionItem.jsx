import React, {useState} from 'react'
import DeleteTransaction from "../../../popups/deleteTransaction"
import EditTransactionModal from '../../../popups/editTransaction'

function TransactionItem({item, loginId}) {
    const [deleteState, setDeleteState] = useState(false)
    const [editState, setEditState] = useState(false)

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', options);
    const transactionItem = {...item, date: formattedDate}

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
                <img src={transactionItem.type==='debit' ? '/transactions/debit.png' : '/transactions/credit.png'} alt={transactionItem.type} />
                <p>{transactionItem.transaction_name || transactionItem.name}</p>
            </div>
            <p className="category">{transactionItem.category}</p>
            <p className="date">{transactionItem.date}</p>
            <p className="amount"><span>{transactionItem.type==='debit' ? '-' : '+'}</span>{transactionItem.amount}</p>
            <div className="buttons">
                {loginId !==3 && <button onClick={()=>{setEditState(!editState)}}><img src="/transactions/edit.png" alt="EDIT" /></button>}
                {loginId !==3 && <button onClick={()=>{setDeleteState(!deleteState)}}><img src="/transactions/delete.png" alt="DELETE" /></button>}
            </div>                            
            </li>
        {
            deleteState && <DeleteTransaction transaction={item} deleteState={deleteState} setDeleteState={updateDeleteState} />
        }
        {
            editState && <EditTransactionModal transaction={transactionItem} editState={editState} setEditState={updateEditState} />
        }
    </>
         
  )
}

export default TransactionItem