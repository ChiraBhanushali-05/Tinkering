'use client';
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image'; // Import Image from next/image

const introHeaderVariants = {
  hide: {
    opacity: 0,
    x: -500,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
    },
  },
};

export function HeroOne() {
  return (
    <div className="relative w-full bg-primary_color2 mt-8">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        {/* Text Section */}
        <div className="flex flex-col justify-center px-4 py-8 md:py-10 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-6 xl:col-span-6">
          <motion.header
            initial="hide"
            whileInView="show"
            exit="hide"
            variants={introHeaderVariants}
            viewport={{ once: true }}
          >
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Tinker and Nurture the future technology technocrats in thrust areas
            </h1>
            <p className="mt-4 text-sm text-gray-700 sm:text-base md:text-lg lg:text-xl">
              Develop technical skills of students on demanding cutting-edge thrust area technologies.
            </p>
          </motion.header>
          <form action="" className="mt-8 flex flex-col sm:flex-row sm:items-start sm:space-x-2">
            <div className="flex-1">
              <input
                className="w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30"
                type="email"
                placeholder="Enter your email"
                id="email"
              />
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">We care about your privacy</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                type="button"
                className="w-full sm:w-auto rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative lg:col-span-5 xl:col-span-6 flex items-top justify-center">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-0 left-0 bg-no-repeat bg-cover rounded-lg overflow-hidden"
            style={{
              backgroundImage: 'url("/images/b1.png")',
              width: '80%', // Adjust to make it responsive
              height: '80%', // Adjust to make it responsive
              filter: 'blur(2px)',
              marginLeft: '20%',
              marginTop: '8%', // Optional: Apply a blur effect if desired
            }}
          ></motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <Image // Replace img with Image
              className="relative z-10 rounded-lg shadow-lg mx-auto"
              src="/images/hero1.jpg" // Ensure this path is correct
              alt="Hero Image"
              width={600} // Specify the width
              height={400} // Specify the height
              layout="responsive" // Add layout for responsiveness
              priority // Optional: Load the image early
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
