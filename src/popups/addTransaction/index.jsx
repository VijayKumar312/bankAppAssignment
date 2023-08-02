import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import { useSelector, useDispatch } from 'react-redux';
import {getAllTransactions, getUserData} from '../../store/transactionSlice'
import './index.scss'

const AddTransactionModal = ({ addTransaction, setAddTransaction }) => {
    const [name, setName] = useState('')
    const [transactionType, setTransactionType] = useState('credit')
    const [category, setCategory] = useState('shopping')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const {userData, loginUserId, allTransactions} = useSelector((state)=>state.transaction)
    const {lastThreeTransactions} = userData
    const dispatch = useDispatch()

    const onFormSubmit=async(event)=>{
        const transactionDetails = {
                name,
                type: transactionType,
                category,
                amount,
                date: (new Date(date)).toISOString(),
                user_id: loginUserId
        }
        const url="https://bursting-gelding-24.hasura.app/api/rest/add-transaction"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'user',
                "x-hasura-user-id": loginUserId
            },
            body: JSON.stringify(transactionDetails)
        }
        try{
            fetch(url, options)
            .then((response)=>response.json())
            .then((data)=>{
                const {insert_transactions_one} = data
                let newAddedData = insert_transactions_one
                dispatch(getAllTransactions([newAddedData, ...allTransactions]))
                dispatch(getUserData({...userData, lastThreeTransactions: [newAddedData, ...lastThreeTransactions]}))
            })
            setAddTransaction()
        }catch(err){
            console.log(err.message)
        }
    }

  return (
    <Popup open={addTransaction} onClose={setAddTransaction} modal>
          {(close) => (
            <div className="modalOverlay">
                <div>
                    <div className='closeButton'>
                        <button onClick={close}>Close</button>
                    </div>
                    <div className="modalContent">
                        <h2>Add Transaction</h2>
                        <form>
                        <label htmlFor='username'>Enter Name</label>
                        <input className='input' type='text' id='username' onChange={(event)=>{setName(event.target.value)}} />
                        <label htmlFor='transactionType'>Transaction Type</label>
                        <select className='input' id='transactionType' onChange={(event)=>{setTransactionType(event.target.value)}}>
                            <option className='option' value='credit'>Credit</option>
                            <option className='option' value='debit'>Debit</option>
                        </select>
                        <label htmlFor='category'>Category</label>
                        <select className='input' id='category' onChange={(event)=>{setCategory(event.target.value)}}>
                            <option className='option' value="shopping">Shopping</option>
                            <option value="transfer">Transfer</option>
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

export default AddTransactionModal;
