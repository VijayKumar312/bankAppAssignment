import React, {useState, useEffect} from 'react'
import { useSelector} from "react-redux";
import TransactionItem from './transactionItem';
import axios from 'axios';

const transactionTypes = [{type: 'ALL TRANSACTIONS', display: 'All Transactions'}, {type: 'DEBIT', display: 'debit'}, {type: 'CREDIT', display: 'credit'}]
function TransactionsList() {
    const [activeTransTab, setActiveTransTab] = useState(transactionTypes[0].display)
    const [transactionsList, setTransactionsList] = useState([])
    const [transactionData, setTransactionData] = useState([])

    useEffect(()=>{
        getAllTransactionList()
    }, [])
    console.log(transactionData)

    const returnDataView=()=>(
        <ul className='transactions'>
            {
                transactionData.map(item=>(
                    <TransactionItem key={item.id} item={item} />         
                ))
            }
        </ul>
    )
    
    const handleEmptyView=()=>{
        if (transactionData === undefined || transactionData.length === 0) {
            return <div className='emptyView'><p>No data to Show</p></div>;
          } else if (transactionData.length > 0) {
            return returnDataView()
          } else {
            return <div className='emptyView'><p>No data to Show</p></div>;
          }
    }

    const getAllTransactionList=async()=>{
            const limit=100
            const offset=0
            const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`
            const options={
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                  'x-hasura-role': 'admin',
                },
              }
            const response = await axios.get(url, options);
            const data = response.data.transactions;
            let dateData=[]
            data.forEach(item=>{
                let date = item.date;
                date = new Date(date);

                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                dateData.push({...item, date: formattedDate})
            })
            setTransactionsList(dateData)
            setTransactionData(dateData)
    }
    const filterTransactionsList=(transType)=>{
        if(transType === 'All Transactions'){
            setTransactionData(transactionsList)
        }else{
            let result = transactionsList.filter(each=>each.type===transType)
            setTransactionData(result)
        }
        setActiveTransTab(transType)
    }
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

export default TransactionsList