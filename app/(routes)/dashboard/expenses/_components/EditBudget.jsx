"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';

import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { eq } from 'drizzle-orm';

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { PenBox } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../../../../../components/ui/dialog";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {

  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo])

  const onUpdateBudget = async () => {
    const result = await db.update(Budgets).set({
      name: name,
      amount: amount,
      icon: emojiIcon,
    }).where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData()
      toast('Budget Updated!')
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'> <PenBox /> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button
                  variant='outline'
                  className='text-lg'
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}
                </Button>
                <div className='absolute z-20'>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji)
                      setOpenEmojiPicker(false)
                    }}
                  />
                </div>

                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input placeholder='e.g. Vacation Fund'
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input
                    type='number'
                    defaultValue={budgetInfo?.amount}
                    placeholder='e.g. 5000'
                    onChange={(e) => setAmount(e.target.value)} />
                </div>

                <Button
                  disabled={!(name && amount)}
                  onClick={() => onUpdateBudget()}
                  className='mt-5 w-full hover:bg-blue-500'>Update Budget
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget