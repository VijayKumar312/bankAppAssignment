import {useState, useEffect } from 'react'
import HomePage from './homePage'
import {ColorRing} from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux'

import { getUserData } from '../../store/transactionSlice'
import './index.scss'
import axios from 'axios'

function Home() {
  const [loadingState, setLoadingState] = useState(true)
  const {loginUserId, userData} = useSelector((state)=>state.transaction)
  const {loginDetails} = userData
  
  const dispatch = useDispatch()

  useEffect(()=>{
    if(loginUserId===3){
      getAdminApiData()
    }else{
      getUserApiData()
    }
  },[loginUserId])

  const userLastSevenDaysTrans=async(headerData)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days"
    try{
      const response = await axios.get(url, headerData)
      const data = response.last_7_days_transactions_credit_debit_totals
      return data
    }catch(err){
      console.log(err.message)
    }
  }
  const userLastThreeTrans=async(headerData)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0"
    try{
      const response = await axios.get(url, headerData)
      const data = response.transactions
      let dateData = []
      data.forEach(item=>{
        let date = item.date;
        date = new Date(date);

        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        dateData.push({...item, date: formattedDate})
      })
      return dateData
    }catch(err){
      console.log(err.message)
    }
  }

  const userTotalCreditAndDebit=async(headerData)=>{
    const url = "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals"
    try{
      const response = await axios.get(url, headerData)
      const data = response.totals_credit_debit_transactions
      return data
    }catch(err){
      console.log(err.message)
    }
  }

  const getUserApiData=async()=>{
    const options = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        "x-hasura-user-id": loginUserId
      }
    }
      try{
        const userResponseData = await Promise.all([
          userTotalCreditAndDebit(options),
            userLastThreeTrans(options),
            userLastSevenDaysTrans(options),
            getAdminProfile(options)
        ])
        const [totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans, userProfile] = userResponseData
        dispatch(getUserData({...userData, totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans, userProfile: {...loginDetails, ...userProfile}}))
        setLoadingState(false)
      }catch(err){console.log(err.message)}
  }
  const getAdminProfile=async(headersData)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/profile"
      const response = await axios.get(url, headersData)
      const data = response.data.users.filter(item=>item.id === loginUserId)[0]
      return data
}
  
  const getLastSevenDaysTrans=async(headersData)=>{
    const url = "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin"
    try{
      const response = await axios.get(url, headersData)
      const data = response.data.last_7_days_transactions_totals_admin
      const sortedDates = data.sort((a,b)=> new Date(a.date) - new Date(b.date))
      return sortedDates
    }catch(err){
      console.log(err.message)
    }
  }
 
  const getLastThreeTrans=async(headersData)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0"
    try{
      const response = await axios.get(url, headersData)
      const data = response.data.transactions
      let dateData=[]
      data.forEach(item=>{
        let date = item.date;
        date = new Date(date);

        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        dateData.push({...item, date: formattedDate})
      })
      return dateData
    }catch(err){
      console.log(err.message)
    }
  }

  const getTotalCreditAndDebit=async(headersData)=>{
    //Total Debit and Credit Amount
    const url = "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
    try{
      const response = await axios.get(url, headersData)
      const data = response.data.transaction_totals_admin
      return data
    }catch(err){
      console.log(err.message)
    }
  }

  const getAdminApiData=async()=>{
    const options={
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    }
    try{
      const userDataResponse = await Promise.all([
        getTotalCreditAndDebit(options),
        getLastThreeTrans(options),
        getLastSevenDaysTrans(options),
        getAdminProfile(options)
      ])
      const [totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans, userProfile] = userDataResponse
      dispatch(getUserData({...userData, totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans, userProfile: {...loginDetails, ...userProfile}}))
      setLoadingState(false)
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div>
      {loadingState ? (
        <div className='loadingPage'>
          <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
      ) : (
        <HomePage />
      ) }
    </div>
  )
}

export default Home
