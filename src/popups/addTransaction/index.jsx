import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import { useSelector, useDispatch } from 'react-redux';
import {getUserData} from '../../store/transactionSlice'
import './index.scss'

const AddTransactionModal = ({ addTransaction, setAddTransaction }) => {
    const [name, setName] = useState('')
    const [transactionType, setTransactionType] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const {userData, loginUserId} = useSelector((state)=>state.transaction)
    const dispaatch = useDispatch()

    const onFormSubmit=(event)=>{
        const transactionDetails = {
                name: "Test",
                type:transactionType,
                category,
                amount,
                date: "2023-06-28T10:00:15+00:00",
                user_id: loginUserId
        }
        const url="https://bursting-gelding-24.hasura.app/api/rest/add-transaction"
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
                        <select className='input' id='transactionType' onChange={(event)=>{setCategory(event.target.value)}}>
                            <option className='option' value={'CREDIT'}>Credit</option>
                            <option className='option' value={'DEBIT'}>Debit</option>
                        </select>
                        <label htmlFor='category'>Category</label>
                        <select className='input' id='category' onChange={(event)=>{setCategory(event.target.value)}}>
                            <option className='option'>Shopping</option>
                        </select>
                        <label htmlFor='amount'>Amount</label>
                        <input className='input' id='amount' type='number' />
                        <label htmlFor='date'>Date</label>
                        <input className='input' id='date' type='date' />
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
