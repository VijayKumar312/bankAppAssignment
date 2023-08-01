import { useSelector } from "react-redux"
function LastTransaction({lastThreeTransactions}) {
  const {loginUserId} = useSelector(state=>state.transaction)
  return (
    <div className='transactionsContainer'>
        <h1>Last transaction</h1>
        <ul className='transactionList'>
            {lastThreeTransactions.map(item=>(
                <li className='transactionItem' key={item.id}>
                    <img src={item.type==='debit' ? '/transactions/debit.png' : '/transactions/credit.png'} alt={item.type} />
                    <p>{item.transaction_name}</p>
                    <p>{item.category}</p>
                    <p>{item.date}</p>
                    <p><span>{item.type==='DEBIT' ? '-' : '+'}</span>{item.amount}</p>
                    {loginUserId !==3 && <button><img src="/transactions/edit.png" alt="EDIT" /></button>}
                    {loginUserId !==3 && <button><img src="/transactions/delete.png" alt="DELETE" /></button>}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default LastTransaction