import React from 'react';
import LastTransaction from './lastTransaction';
import TransactionChart from './transactionChart';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard({ addTransaction }) {
  const { userData } = useSelector((state) => state.transaction);
  const { totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans } = userData;

  const handleLastThree = () => {
    if (lastThreeTransactions === undefined || lastThreeTransactions.length === 0) {
      return <div className='emptyView'><h1>Last Three Transactions</h1><p>No data to Show</p></div>;
    } else if (lastThreeTransactions.length > 0) {
      return <LastTransaction lastThreeTransactions={lastThreeTransactions} />;
    } else {
      return <div className='emptyView'><h1>Last Three Transactions</h1><p>No data to Show</p></div>;
    }
  };

  const handleLastSevenDays = () => {
    if (lastSevenDaysTrans === undefined || lastSevenDaysTrans.length === 0) {
      return <div className='emptyView'><h1>Last Seven days Transactions</h1><p>No data to Show</p></div>;
    } else if (lastSevenDaysTrans.length > 0) {
      return <TransactionChart lastSevenDaysTrans={lastSevenDaysTrans} />;
    } else {
      return <div className='emptyView'><h1>Last Seven days Transactions</h1><p>No data to Show</p></div>;
    }
  };

  return (
    <div className='dashboard'>
      <div className='debitAndCreditCards'>
        <div className='card'>
          <div className='totalSumCard'>
            <p className='credit'>
              ${totalCreditAndDebit && totalCreditAndDebit.length > 0 ? totalCreditAndDebit[0].sum : 0}
            </p>
            <p className='caption'>
              {totalCreditAndDebit && totalCreditAndDebit.length > 0 ? totalCreditAndDebit[0].type : 'credit'}
            </p>
          </div>
          <div>
            <img src="/creditLogo.png" alt="credit" />
          </div>
        </div>
        <div className='card'>
          <div className='totalSumCard'>
            <p className='debit'>
              ${totalCreditAndDebit && totalCreditAndDebit.length > 1 ? totalCreditAndDebit[1].sum : 0}
            </p>
            <p className='caption'>
              {totalCreditAndDebit && totalCreditAndDebit.length > 1 ? totalCreditAndDebit[1].type : 'debit'}
            </p>
          </div>
          <div>
            <img src="/debitLogo.png" alt="debit" />
          </div>
        </div>
      </div>

      {handleLastThree()}
      {handleLastSevenDays()}
    </div>
  );
}

export default Dashboard;
