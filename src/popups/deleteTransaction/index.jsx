import {LuLogOut} from 'react-icons/lu'
import {MdCancel} from 'react-icons/md'
import Popup from 'reactjs-popup';

import './index.scss'
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions, getUserData } from '../../store/transactionSlice';

function DeleteTransaction({deleteState, setDeleteState, transaction}) {
  const {loginUserId, userData, allTransactions} = useSelector(state=>state.transaction)
  const {lastThreeTransactions} = userData
  const dispatch = useDispatch()

    const onDeleteState=async ()=>{
      try{
        const url="https://bursting-gelding-24.hasura.app/api/rest/delete-transaction"
        const options = {
          method: 'DELETE',
          headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
              'x-hasura-role': 'user',
              "x-hasura-user-id": loginUserId
          },
          body: JSON.stringify({id: transaction.id})
      }
       await fetch(url, options)
      .then(()=>{console.log('Data deleted successfully')})
      }catch(err){
        console.log(err.message) 
      }
      const filteredThreeTrans = lastThreeTransactions.filter(item=>item.id!==transaction.id)
      dispatch(getUserData({...userData, lastThreeTransactions: filteredThreeTrans}))

      const filteredAllTransactions = allTransactions.filter(item=>item.id !== transaction.id)
      dispatch(getAllTransactions(filteredAllTransactions))
      setDeleteState()
    }

  return (
    <Popup open={deleteState} onClose={setDeleteState} modal>
          {(close) => (
            <div className="logoutModalOverlay">
                <div className='logoutContent'>
                    <button className='logoutIcon'><LuLogOut /></button>
                    <div>
                        <h1>Are you sure you want to Delete?</h1>
                        <div>
                            <button className='confirm' onClick={onDeleteState}>Yes, Delete</button>
                            <button className='cancel' onClick={close}>No, Leave it</button>
                        </div>
                    </div>
                    <button className='close' onClick={close} ><MdCancel /></button>
                </div>
            </div>
          )}
        </Popup>
  )
}

export default DeleteTransaction

