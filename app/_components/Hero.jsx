"use client"

import React from 'react'
import Image from "next/image";
import { useUser } from '@clerk/nextjs';

function Hero() {

  const { user, isSignedIn } = useUser();

  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Track Your Expenses
            <span className="block text-xl sm:text-4xl font-semibold text-primary mt-3">
              Master Your Finances
            </span>
          </h1>

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            Gain insights into your spending habits, set budgets, and save more effectively. This tool helps you manage your finances with ease and clarity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href={isSignedIn ? "/dashboard" : "/sign-in"}
            >
              Get Started
            </a>

          </div>
        </div>
      </div>
      <div className="mt-3 lg:mt-0 lg:flex lg:justify-end">
        <Image
          src='/dashboard.png'
          alt='Dashboard preview'
          width={1000}
          height={700}
          className='rounded-xl border-2 border-gray-100'
        />
      </div>
    </section>
  )
}

export default Hero