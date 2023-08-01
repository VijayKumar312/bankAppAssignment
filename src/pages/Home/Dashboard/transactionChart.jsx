import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

function TransactionChart({ lastSevenDaysTrans }) {
  // Combine "credit" and "debit" values for each date
  const combinedData = lastSevenDaysTrans.map((entry) => ({
    name: entry.name,
    credit: entry.type === 'credit' ? entry.sum : 0,
    debit: entry.type === 'debit' ? entry.sum : 0,
  }));

  return (
    <div className='transactionsChart' style={{ height: '300px', overflow: 'hidden' }}>
      <h1>Debit & Credit Overview</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={combinedData}
          margin={{
            top: 5,
            right: 10,
            left: 5,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 100, 200, 300, 400]} overflow={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="credit" fill="#FCAA0B" stackId="stack" maxBarSize={20} />
          <Bar dataKey="debit" fill="#4D78FF" stackId="stack" maxBarSize={20} style={{ marginRight: '10px' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionChart;
