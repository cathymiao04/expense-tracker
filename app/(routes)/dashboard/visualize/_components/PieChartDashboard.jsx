import React from 'react'

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PieChartDashboard = ({ budgetList }) => {
  const COLORS = ['#1E90FF', '#6A5ACD', '#483D8B', '#9932CC', '#242124', '#100C0'];

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg mb-4'>Budget Allocation by Item Count</h2>
      <ResponsiveContainer width='100%' height={300}>
        {budgetList.length > 0 ? (
          <PieChart>
            <Pie
              data={budgetList}
              dataKey='totalItem'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => `${entry.name}: ${entry.totalItem} items`}
            >
              {budgetList.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} items`} />
          </PieChart>
        ) : (
          <p>No budget data available.</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDashboard;