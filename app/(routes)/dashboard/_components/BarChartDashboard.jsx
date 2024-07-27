import React from 'react'

import { Bar, BarChart, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg mb-4'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart
          data={budgetList}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSpend' stackId='a' name='Total Spent' fill='#483D8B' />
          <Bar dataKey='amount' stackId='a' name='Budgeted Amount' fill='#CCCCFF' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard