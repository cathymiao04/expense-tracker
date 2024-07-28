import React from 'react'
import Link from 'next/link'

function BudgetItem({ budget }) {

  const calculateProgressPercent = () => {
    const percent = (budget.totalSpend / budget.amount) * 100;
    return percent.toFixed(2);
  }

  const getProgressColor = () => {
    if (calculateProgressPercent() <= 50) {
      return 'bg-green-500';
    }
    else if (calculateProgressPercent() <= 75) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  }

  return (
    <Link href={'/dashboard/expenses/' + budget?.id}>
      <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[160px]'>
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
              {budget?.icon}
            </h2>
            <div>
              <h2 className='font-bold'>{budget.name}</h2>
              <h2 className='text-sm text-gray-500'>{budget.totalItem} Item{budget.totalItem !== 1 ? 's' : ''}</h2>
            </div>
          </div>
          <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
        </div>

        <div className='mt-5'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xs text-slate-400'>${budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
            <h2 className='text-xs text-slate-400'>${budget.amount - budget.totalSpend} Remaining</h2>
          </div>

          <div className='w-full bg-slate-300 h-2 rounded-full'>
            <div className={`h-2 rounded-full ${getProgressColor()}`}
              style={{
                width: `${calculateProgressPercent()}%`
              }}>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default BudgetItem