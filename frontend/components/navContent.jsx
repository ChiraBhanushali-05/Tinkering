'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import IconCloudDemo from "../components/IconCloudDemo";
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';

const BenefitsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [imagesCount]);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        perPage: 1,
        gap: '1rem',
      }}
      className="w-full py-5"
    >
      <CarouselContent className="flex w-full ">
        <AnimatePresence>
          {Array.from({ length: imagesCount }).map((_, index) => (
            index === currentIndex && (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-full flex justify-center items-center "
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-64 h-64 md:w-72 md:h-72 flex items-center justify-center mb-28"> {/* Adjusting to square shape */}
                  <CardContent className="flex items-center justify-center p-2 ">
                    <Image
                      src={`/images/sd${index + 1}.png`}
                      alt={`Benefit Image ${index + 1}`}
                      width={288}
                      height={288}
                      className="object-contain"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          ))}
        </AnimatePresence>
      </CarouselContent>
    </Carousel>
  );
};

// Updated section styling for a white background, rounded border, and shadow
const sectionStyle = "flex flex-col md:flex-row justify-between items-start mt-12 bg-primary_color2 rounded-lg shadow-lg p-4 md:p-8 min-h-[400px] ";

const TechSupportInternshipSection = () => (
  <div className={sectionStyle}>
    <div className="flex-1 md:ml-8 text-black">
      <div>
        <p className="text-2xl md:text-3xl font-bold mb-2">Tech Support &</p>
        <p className="text-2xl md:text-3xl font-bold mb-2">Internship</p>
      </div>
      <h3 className="text-black text-sm md:text-base">
        We offer specialized tech support and internship programs for startups, providing expert guidance and remote
        assistance. Our internships connect aspiring tech professionals with startups, offering hands-on experience and
        mentorship. This collaboration helps startups grow while giving interns valuable industry insights and skills.
      </h3>
    </div>
    <div className="flex-1 flex justify-center">
  {/* Replace the carousel with an image */}
  <img
    src="/images/intern1.jpg"
    alt="Tech Support and Internship"
    className="w-3/4 h-auto rounded-lg shadow-lg"
  />
</div>

  </div>
);




// const MicrosoftCertificationSection = () => (
//   <div className={sectionStyle}>
//     <div className="flex-1 md:ml-8 text-black">
//       <div>
//         <p className="text-xl md:text-2xl font-bold mb-2">Microsoft Certification</p>
//         <p className="text-xl md:text-2xl font-bold mb-2">Courses</p>
//       </div>
//       <h3 className="text-black text-sm md:text-base">
//         Connect, collaborate, and innovate with like-minded individuals in our dynamic Tinkering Hub Communities. Share
//         ideas, solve challenges, and advance your skills in a supportive network.
//       </h3>
//     </div>
//     <div className="flex-1 flex justify-center relative">
//       <div className="relative w-[150px] h-[200px] md:w-[250px] md:h-[350px]">
//         <Image
//           src="/images/Certification.png"
//           alt="Certification"
//           width={350}
//           height={450}
//           className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 z-10"
//         />
//         <Image
//           src="/images/Certification.png"
//           alt="Certificate 2"
//           width={350}
//           height={450}
//           className="absolute top-0 left-0 transform translate-x-1 translate-y-1 z-20"
//         />
//         <Image
//           src="/images/Certification.png"
//           alt="Certificate 3"
//           width={350}
//           height={450}
//           className="absolute top-0 left-0 transform translate-x-4 translate-y-4 z-30"
//         />
//       </div>
//     </div>
//   </div>
// );

const BenefitsToStudentsSection = () => (
  <div className={sectionStyle}>
    <div className="flex-1 md:ml-8 text-black">
      <div>
        <p className="text-2xl md:text-3xl font-bold mb-2">Design System for easy</p>
        <p className="text-2xl md:text-3xl font-bold mb-2">community access</p>
      </div>
      <h3 className="text-black text-sm md:text-base">
        Connect, collaborate, and innovate with like-minded individuals in our dynamic Tinkering Hub Communities. Share
        ideas, solve challenges, and advance your skills in a supportive network.
      </h3>
    </div>
    <div className="flex-1 flex justify-center items-center w-full md:max-w-lg">
      <BenefitsCarousel />
    </div>
  </div>
);

const NavAndContentSection = () => {
  const [activeSection, setActiveSection] = useState('tinkering');

  return (
    <>
      <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-12 md:flex-nowrap">
        {[
          { id: 'tinkering', label: 'Tinkering Hub Communities' },
          { id: 'tech-support', label: 'Tech Support & Internship' },
          
          { id: 'benefits', label: 'Benefits to Students' },
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`text-sm md:text-lg cursor-pointer transition-colors px-2 py-1 ${
              activeSection === section.id ? 'text-black border-b-2 border-black' : 'text-gray-500'
            } flex-[1_0_48%] md:flex-auto`} /* Two per row on mobile, one line on larger screens */
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </a>
        ))}
      </nav>

      {activeSection === 'tinkering' && (
        <div className={sectionStyle}>
          <div className="flex-1 md:ml-8 text-black " >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mt-4 md:mt-8 ml-4 md:ml-8">Tinkering Hub</h3>
              <h3 className="text-2xl md:text-3xl font-bold ml-4 md:ml-8">Communities</h3>
            </div>
            <p className="text-black text-sm md:text-base mt-4 md:mt-8 pl-4 md:pl-9">
              Connect, collaborate, and innovate with like-minded individuals in our dynamic Tinkering Hub Communities.
              Share ideas, solve challenges, and advance your skills in a supportive network.
            </p>
          </div>
          <div className="flex-1 flex justify-start">
            <IconCloudDemo />
          </div>
        </div>
      )}

      {activeSection === 'tech-support' && <TechSupportInternshipSection />}
      {activeSection === 'certification' && <MicrosoftCertificationSection />}
      {activeSection === 'benefits' && <BenefitsToStudentsSection />}
    </>
  );
};

export default NavAndContentSection;
