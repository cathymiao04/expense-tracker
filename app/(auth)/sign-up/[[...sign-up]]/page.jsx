"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="background"
            src="https://images.unsplash.com/photo-1524602997322-c1900e093d3d?q=80&w=2988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a
              className="block text-white"
              href="#"
              onClick={() => (window.location.href = "/")}
            >
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expense Tracker
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Create an account today to access our comprehensive tools for tracking expenses and managing your budget efficiently.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-gray-100 text-black sm:size-20"
                href="#"
                onClick={() => (window.location.href = "/")}
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Expense Tracker
              </h1>

              <p className="mt-4 mb-4 leading-relaxed text-gray-700">
                Create an account today to access our comprehensive tools for tracking expenses and managing your budget efficiently.
              </p>
            </div>

            <div className="flex items-center justify-center px-4 py-4">
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}