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
      <h1 className='text-3xl font-bold mb-4'>My Expenses</h1>
      <p className='text-gray-500'>
        Track and manage your expenses efficiently. Review your spending, update records, and keep a detailed log of your financial activities to stay on top of your budget.
      </p>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getAllExpenses()}
      />
    </div>
  );
}

export default ExpensesMainPage;