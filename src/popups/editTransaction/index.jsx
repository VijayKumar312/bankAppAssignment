import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss'
import axios from 'axios';
import { getUserData } from '../../store/transactionSlice';

const EditTransactionModal = ({ transaction, editState, setEditState }) => {
    const [name, setName] = useState('')
    const [transactionType, setTransactionType] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const dispatch = useDispatch()

    const {loginUserId, userData} = useSelector((state)=>state.transaction)
    const {lastThreeTransactions} = userData

    const onFormSubmit=async(event)=>{
        event.preventDefault()
        const transactionDetails = {
            id: transaction.id,
            name,
            type:transactionType,
            category,
            amount,
            date,
            user_id: loginUserId
     
    }
    try{
        const url="https://bursting-gelding-24.hasura.app/api/rest/update-transaction"
        const options = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'user',
                "x-hasura-user-id": loginUserId
            },
            body: JSON.stringify(transactionDetails)
        }
        const response = await axios.post(url, options)
        const requiredTrans = lastThreeTransactions.filter(item=>item.id !== transaction.id)
        dispatch(getUserData({...userData, lastThreeTransactions: [...requiredTrans, transactionDetails]}))
        setEditState()

    }catch(err){
        console.log(err.message)
    }

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
                                <option className='option' value={'CREDIT'}>Credit</option>
                                <option className='option' value={'DEBIT'}>Debit</option>
                            </select>
                            <label htmlFor='category'>Category</label>
                            <select className='input' id='category' onChange={(event)=>{setCategory(event.target.value)}}>
                                <option className='option'>Shopping</option>
                            </select>
                            <label htmlFor='amount'>Amount</label>
                            <input className='input' id='amount' type='number' onChange={(event)=>{setAmount(event.target.value)}} />
                            <label htmlFor='date'>Date</label>
                            <input className='input' id='date' type='date' onChange={(event)=>{setDate(event.target.value)}} />
                        </form>
                        <button onClick={onFormSubmit}>Add Transaction</button>
                    </div>
                </div>
            </div>
          )}
        </Popup>
  );
};

export default EditTransactionModal;
