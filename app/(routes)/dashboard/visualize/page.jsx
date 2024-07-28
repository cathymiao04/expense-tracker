"use client"

import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'

import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { getTableColumns, eq, sql, desc } from 'drizzle-orm';

import PieChartDashboard from "./_components/PieChartDashboard";
import BarChartDashboard from '../_components/BarChartDashboard';

function VisualizePage() {

  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getBudgetList();
  }, [user])

  const getBudgetList = async () => {

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))

    setBudgetList(result);
    setLoading(false);
  }

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-4'>Visualize Your Finances</h1>
      <p className='text-gray-500 mb-8'>
        Gain insights into your financial data with detailed visualizations.
      </p>
      <div className='flex flex-wrap -mx-4'>
        <div className='w-full md:w-1/2 px-2 mb-4'>
          <PieChartDashboard budgetList={budgetList} />
        </div>
        <div className='w-full md:w-1/2 px-2 mb-4'>
          <BarChartDashboard budgetList={budgetList} />
        </div>
      </div>
    </div>
  )
}

export default VisualizePage