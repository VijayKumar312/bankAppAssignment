import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from "react-redux";
import TransactionItem from './transactionItem';
import axios from 'axios';
import { getAllTransactions } from '../../../store/transactionSlice';
import Loader from '../../../components/loader';

const transactionTypes = [{display: 'All Transactions'}, {display: 'debit'}, {display: 'credit'}]
function TransactionsList() {
    const [activeTransTab, setActiveTransTab] = useState(transactionTypes[0].display)
    const [loadingState, setLoadingState] = useState(true)
    const [transactionData, setTransactionData] = useState([])

    const dispatch = useDispatch()
    const {userData, loginUserId, allTransactions} = useSelector(state=>state.transaction)

    useEffect(()=>{
        if(loginUserId === 3){
            getAllTransactionsOfAdmin()
        }else{
            getUserTransactionList()
        }
    }, [])
    useEffect(()=>{
        setTransactionData(allTransactions)
    },[allTransactions])

    const filterTransactionsList=(transType)=>{
        if(transType === 'All Transactions'){
            setTransactionData(allTransactions)
        }else{
            let result = allTransactions.filter(each=>each.type===transType)
            setTransactionData(result)
        }
        setActiveTransTab(transType)
    }

    const renderDataView=()=>(
        <ul className='transactions'>
            {
                transactionData.map(item=>(
                    <TransactionItem key={item.id} item={item} loginId={loginUserId} />         
                ))
            }
        </ul>
    )
    
    const handleEmptyView=()=>{
        if(allTransactions && allTransactions.length>0){
            return renderDataView()
        }else{
            return <div>No Data to Show</div>
        }
    }

    const getAllTransactionList=async(headerData)=>{
            const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0`
            const response = await axios.get(url, headerData);
            const data = response.data.transactions;
            if(data.length > 0){
                let dateData=[]
                data.forEach(item=>{
                    let date = item.date;
                    date = new Date(date);
                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    dateData.push({...item, date: formattedDate})
                })
                setTransactionData(dateData)
                return dateData
            }
            else{
                return []
            }
    }
    const getUserTransactionList=async()=>{
        const options={
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'user',
                'x-hasura-user-id': loginUserId
            }
        }
        const response = await getAllTransactionList(options)
        dispatch(getAllTransactions(response))
        setLoadingState(false)
    }
    const getAllTransactionsOfAdmin=async()=>{
        let options = {
            headers:{
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'admin',
            }
        }
        const response = await getAllTransactionList(options)
        dispatch(getAllTransactions(response))
        setLoadingState(false)
    }

  if(loadingState){
    return <Loader />
  }else{
    return (
        <div className='transactionsTab'>
            <ul className='transactionType'>
                {
                    transactionTypes.map(each=>(
                        <li key={each.id} onClick={()=>{filterTransactionsList(each.display)}} className={each.display===activeTransTab && 'active'}>{each.display}</li>
                    ))
                }
            </ul>
            <div className='transactionHistoryList'>
                <div className='headings'>
                    <p>Transaction Name</p>
                    <p>Category</p>
                    <p>Date</p>
                    <p>Amount</p>
                </div>
                {
                    handleEmptyView()
                }
            </div>
        </div>
      )
  }
}

export default TransactionsList