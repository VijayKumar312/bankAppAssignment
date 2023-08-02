import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss'
import { getAllTransactions, getUserData } from '../../store/transactionSlice';

const EditTransactionModal = ({ transaction, editState, setEditState }) => {
    const [name, setName] = useState(transaction.name || "")
    const [transactionType, setTransactionType] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(transaction.amount || "")
    const [date, setDate] = useState('')
    const dispatch = useDispatch()

    const {loginUserId, userData, allTransactions} = useSelector((state)=>state.transaction)
    const {lastThreeTransactions} = userData

    const onFormSubmit=()=>{
        let standardDate = new Date(date)
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = standardDate.toLocaleDateString('en-US', options);
        const transactionDetails = {
            id: transaction.id,
            name,
            type: transactionType,
            category,
            amount,
            date: standardDate.toISOString(),
    }
    try{
        const url="https://bursting-gelding-24.hasura.app/api/rest/update-transaction"
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'user',
                "x-hasura-user-id": loginUserId
            },
            body: JSON.stringify(transactionDetails)
        }
        fetch(url, options)
            .then((response)=>response.json())
            .then(()=>{console.log('Data Edited Successfully')})     
    }catch(err){
        console.log(err.message)
    }
    const requiredTrans = lastThreeTransactions.filter(item=>item.id !== transaction.id)
    dispatch(getUserData({...userData, lastThreeTransactions: [{...transactionDetails, date: formattedDate}, ...requiredTrans ]}))

    const requiredAllTrans = allTransactions.filter(item=>item.id !== transaction.id)
    dispatch(getAllTransactions([{...transactionDetails, date: formattedDate}, ...requiredAllTrans])) 
    setEditState()
    }

  return (
    <Popup open={editState} onClose={setEditState} modal>
          {(close) => (
            <div className="modalOverlay">
                <div>
                    <div className='closeButton'>
                        <button onClick={close}>Close</button>
                    </div>
                    <div className="modalContent">
                        <h2>Update Transaction</h2>
                        <p>You can update your transaction here</p>
                        <form>
                            <label htmlFor='username'>Enter Name</label>
                            <input className='input' type='text' value={name} id='username' onChange={(event)=>{setName(event.target.value)}} />
                            <label htmlFor='transactionType'>Transaction Type</label>
                            <select className='input' id='transactionType' onChange={(event)=>{setTransactionType(event.target.value)}}>
                                <option className='option' value={'credit'}>Credit</option>
                                <option className='option' value={'debit'}>Debit</option>
                            </select>
                            <label htmlFor='category'>Category</label>
                            <select className='input' id='category' onChange={(event)=>{setCategory(event.target.value)}}>
                                <option className='option' value="shopping">Shopping</option>
                                <option className='option' value='transfer'>Transfer</option>
                                <option className='option' value='other'>Other</option>
                            </select>
                            <label htmlFor='amount'>Amount</label>
                            <input className='input' id='amount' type='number' onChange={(event)=>{setAmount(event.target.value)}} />
                            <label htmlFor='date'>Date</label>
                            <input className='input' id='date' type='date' onChange={(event)=>{setDate(event.target.value)}} />
                        </form>
                        <button onClick={onFormSubmit}>Edit Transaction</button>
                    </div>
                </div>
            </div>
          )}
        </Popup>
  );
};

export default EditTransactionModal;
