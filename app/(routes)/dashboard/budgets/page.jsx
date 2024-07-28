import React from 'react'

import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl mb-4'>My Budgets</h2>
      <p className='text-gray-500'>Manage your budgets and track your spending. Create, view, and update your budget allocations.</p>
      <BudgetList />
    </div>
  )
}

export default Budgets