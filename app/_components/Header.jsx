"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";

function Header() {

  const { isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

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
        {
          loading ?
            (<Loader className="animate-spin" size={24} />)
            :
            (
              isSignedIn ?
                (<UserButton />)
                :
                (
                  <Link href={'/sign-in'}>
                    <Button>Get Started</Button>
                  </Link>
                )
            )}
      </div>
    </div>
  )
}

export default Header