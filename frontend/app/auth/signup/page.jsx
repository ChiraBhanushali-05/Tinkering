'use client';
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image from Next.js

const Button = ({ children, onClick, icon: Icon, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none ${className}`}
  >
    {Icon && (
      <span className="mr-2 inline-block">
        <Icon className="h-6 w-6" />
      </span>
    )}
    {children}
  </button>
);

function SignUpOne() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-primary_color1 min-h-screen">
        
        {/* Back Button */}
        <Link href="/" className="absolute top-4 right-4 inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>

        {/* Form Section - Always visible */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
        >
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-primary_color2 p-8 rounded-xl shadow-lg dark:shadow-gray-600">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-black transition-all duration-200 hover:underline">
                Login
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">Full Name</label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </div>
                </div>
                <div>
                  <Button className="bg-black text-white">
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <Button icon={() => (
                <svg
                  className="text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              )}>
                Sign up with Google
              </Button>
              <Button icon={() => (
                <svg
                  className="text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              )}>
                Sign up with Facebook
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Image Section - Hidden on smaller screens */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="hidden lg:flex h-full w-full justify-center items-center p-8"
        >
          <Image
            className="mx-auto rounded-md object-cover max-w-full lg:max-w-md"
            src="/images/signup.png"
            alt="Sign up"
            width={500} // Set the desired width
            height={500} // Set the desired height
          />
        </motion.div>
        
      </div>
    </section>
  );
}

export default SignUpOne;
