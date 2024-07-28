"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { LayoutGrid, PiggyBank, ReceiptText, ChartBar } from 'lucide-react'

function SideNav() {

  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Visualizations',
      icon: ChartBar,
      path: '/dashboard/visualize'
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [path])

  return (
    <div className='h-screen p-5 border-r shadow-sm'>

      <Image
        src={'/logo.svg'}
        alt='logo'
        width={160}
        height={100}
        className='w-auto h-auto max-w-full'
      />

      <div className='mt-5'>
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2 key={menu.id} className={`file:flex gap-2 items-center text-gray-500 font-medium mb-2
          p-5 cursor-pointer rounded-md hover:text-blue-700 hover:bg-blue-100
          ${path == menu.path && 'text-blue-700 bg-blue-100'}`}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton />
        User Profile
      </div>

    </div>
  )
}

export default SideNav