import {createSlice} from '@reduxjs/toolkit'
const trasantionshistory = [{type: 'DEBIT', purpose: 'Spotify Subscription', category: 'Shopping', date: '28 Jan, 12:30 AM', amount: '$150'}, {type: 'CREDIT', purpose: 'Spotify Subscription', category: 'Shopping', date: '28 Jan, 12:30 AM', amount: '$150'}]
const transactionSlice=createSlice({
    name: 'transactions',
    initialState: {
        transactionsHistory: trasantionshistory,
        userData: {},
        loginUserId: ''
    },
    reducers: {
        getTransactionsList: (state, action)=>{
            state.transactionsHistory = action.payload
        },
        getLoginUserId: (state, action)=>{
            state.loginUserId = action.payload
        },
        getUserData: (state, action)=>{
            state.userData = action.payload
        }
    },
})
export const {getTransactionsList, getLoginUserId, getUserData} = transactionSlice.actions
export default transactionSlice.reducer