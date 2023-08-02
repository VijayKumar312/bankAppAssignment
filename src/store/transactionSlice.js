import {createSlice} from '@reduxjs/toolkit'
const trasantionshistory = [{type: 'DEBIT', purpose: 'Spotify Subscription', category: 'Shopping', date: '28 Jan, 12:30 AM', amount: '$150'}, {type: 'CREDIT', purpose: 'Spotify Subscription', category: 'Shopping', date: '28 Jan, 12:30 AM', amount: '$150'}]
const transactionSlice=createSlice({
    name: 'transactions',
    initialState: {
        userData: {},
        loginUserId: '',
        allTransactions: []
    },
    reducers: {
        getLoginUserId: (state, action)=>{
            state.loginUserId = action.payload
        },
        getUserData: (state, action)=>{
            state.userData = action.payload
        },
        getAllTransactions: (state, action)=>{
            state.allTransactions = action.payload
        }
    },
})

export const {getLoginUserId, getUserData, getAllTransactions} = transactionSlice.actions
export default transactionSlice.reducer
