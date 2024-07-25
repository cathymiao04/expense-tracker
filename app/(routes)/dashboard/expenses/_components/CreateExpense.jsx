import React, { useState } from 'react'
import { db } from "../../../../../utils/dbConfig";
import { Expenses, Budgets } from "../../../../../utils/schema";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";
import moment from 'moment';

function CreateExpense({ budgetId, user, refreshData }) {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const createNewExpense = async () => {
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: moment().format('DD/MM/yyyy')
    }).returning({ insertedId: Budgets.id });

    console.log(result);
    if (result) {
      refreshData()
      toast('New Expense Added!')
    }
  }

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>

      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input placeholder='e.g. Bedroom Decor'
          onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input placeholder='e.g. 1000'
          onChange={(e) => setAmount(e.target.value)} />
      </div>

      <Button disabled={!(name && amount)}
        onClick={() => createNewExpense()}
        className='mt-3 w-full'>Add New Expense</Button>
    </div>
  )
}

export default CreateExpense