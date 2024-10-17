'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CardThree } from './CardThree';

// Motion variants for left and right animations
const leftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const rightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const HeroSection = () => {
  return (
    <>
      {/* Heading and Description - Always Visible */}
      <div className="text-center text-black my-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Tinkering Process</h1>
        <p className="text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          Your compass to innovation and design excellence. From exploration to execution, this dynamic framework fuels
          creativity and precision, ensuring your product journey aligns seamlessly with user desires.
        </p>
      </div>

      {/* Desktop Sections */}
      <section className="desktop-section max-w-6xl mx-auto">
        {/* Sensitizing Section */}
        <motion.div
          className="flex items-center justify-between mt-8 gap-8 pb-8"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={leftVariants}
        >
          <motion.div className="flex-1 flex flex-col items-start ml-28 text-[#333333]">
            <h2 className="text-3xl font-bold">Sensitizing</h2>
            <h3 className="mt-0">
              <span className="block w-full text-left mb-2 text-xl">Promotion of Concept to Every</span>
              <span className="block w-full text-left mb-2 text-xl">Stakeholder</span>
            </h3>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            variants={rightVariants}
          >
            <Image src="/images/img1.png" alt="Vector Image" width={250} height={250} />
          </motion.div>
        </motion.div>

        {/* Training Section */}
        <motion.div
          className="flex items-center justify-between mt-8 gap-8 pb-8"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={rightVariants}
        >
          <motion.div className="flex-1 flex justify-center">
            <Image src="/images/img2.png" alt="Training Image" width={400} height={400} />
          </motion.div>
          <motion.div
            className="flex-1 flex flex-col items-start ml-28 text-[#333333]"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            variants={leftVariants}
          >
            <h2 className="text-3xl font-bold">Training</h2>
            <h3 className="mt-0">
              <span className="block w-full text-left mb-2 text-xl">Student from Beginning to Advance</span>
              <span className="block w-full text-left mb-2 text-xl">Level</span>
            </h3>
          </motion.div>
        </motion.div>

        {/* Interning Section */}
        <motion.div
          className="flex items-center justify-between mt-8 gap-8 pb-8"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={leftVariants}
        >
          <motion.div className="flex-1 flex flex-col items-start ml-28 text-[#333333]">
            <h2 className="text-3xl font-bold">Interning</h2>
            <h3 className="mt-0">
              <span className="block w-full text-left mb-2 text-xl">Engaging in Various Live Projects /</span>
              <span className="block w-full text-left mb-2 text-xl">Real-World Problems</span>
            </h3>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            variants={rightVariants}
          >
            <Image src="/images/img3.png" alt="Interning Image" width={400} height={400} />
          </motion.div>
        </motion.div>

        {/* Testing Section */}
        <motion.div
          className="flex items-center justify-between mt-8 gap-8 pb-8"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={rightVariants}
        >
          <motion.div className="flex-1 flex justify-center">
            <Image src="/images/img4.png" alt="Testing Image" width={400} height={400} />
          </motion.div>
          <motion.div
            className="flex-1 flex flex-col items-start ml-28 text-[#333333]"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            variants={leftVariants}
          >
            <h2 className="text-3xl font-bold">Testing</h2>
            <h3 className="mt-0">
              <span className="block w-full text-left mb-2 text-xl">Appearing for Professional</span>
              <span className="block w-full text-left mb-2 text-xl">Certifications (Microsoft / Google / IBM)</span>
            </h3>
          </motion.div>
        </motion.div>

        {/* Challenging Section */}
        <motion.div
          className="flex items-center justify-between mt-8 gap-8 pb-8"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={leftVariants}
        >
          <motion.div className="flex-1 flex flex-col items-start ml-28 text-[#333333]">
            <h2 className="text-3xl font-bold">Challenging</h2>
            <h3 className="mt-0">
              <span className="block w-full text-left mb-2 text-xl">Work on Complex Problem /</span>
              <span className="block w-full text-left mb-2 text-xl">Research / Startups / Innovation</span>
            </h3>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            variants={rightVariants}
          >
            <Image src="/images/img5.png" alt="Challenging Image" width={400} height={400} />
          </motion.div>
        </motion.div>
      </section>

      {/* Mobile Cards */}
      <div className="mobile-cards hidden">
        <CardThree />
      </div>

      {/* CSS for responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-section {
            display: none; /* Hide sections on mobile */
          }

          .mobile-cards {
            display: block; /* Show mobile cards on mobile */
          }
        }
      `}</style>
    </>
  );
};

export default HeroSection;
