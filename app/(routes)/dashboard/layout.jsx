"use client"

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { db } from '../../../utils/dbConfig'
import { Budgets } from '../../../utils/schema'
import { eq } from 'drizzle-orm'

import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { Menu, X } from "lucide-react";

function DashboardLayout({ children }) {

  const { user } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkUserBudgets = async () => {
    const result = await db.select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))

    if (result?.length == 0) {
      router.replace('/dashboard/budgets')
    }
  }

  return (
    <div>

      <div className='fixed md:w-64 hidden md:block'>
        <SideNav />
      </div>

      <div className='md:ml-64'>
        <div className='flex justify-between items-center p-4 md:hidden'>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <DashboardHeader />
        </div>

        {isMenuOpen && (
          <div className='absolute bg-white shadow-md w-full z-10 md:hidden'>
            <SideNav />
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default DashboardLayout