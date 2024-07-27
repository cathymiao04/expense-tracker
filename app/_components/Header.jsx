"use client"

import React from 'react'
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "../../components/ui/button"

function Header() {

  const { user, isSignedIn } = useUser();

  return (
    <div className='p-5 flex justify-between items-center border-b shadow-sm'>

      <Image
        src={'./logo.svg'}
        alt='logo'
        width={160}
        height={100}
        className='w-auto h-auto max-w-full'
      />

      <div className='flex items-center space-x-4'>
        {isSignedIn ?
          <UserButton /> :
          <Link href={'/sign-in'}>
            <Button className='bg-primary text-white hover:bg-blue-700 focus:outline-none focus:ring'>
              Get Started
            </Button>
          </Link>
        }
      </div>

    </div>
  )
}

export default Header