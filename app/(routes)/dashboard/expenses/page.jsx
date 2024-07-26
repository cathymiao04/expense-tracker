"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs"

import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { eq, desc } from 'drizzle-orm';

import ExpenseListTable from "./_components/ExpenseListTable";

function ExpensesMainPage() {

  const [expensesList, setExpensesList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user])

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>My Expenses</h1>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getAllExpenses()}
      />
    </div>
  );
}

export default ExpensesMainPage;
