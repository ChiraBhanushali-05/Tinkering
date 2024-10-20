'use client';

import * as React from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { Card } from "../components/ui/card"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

export function CarouselSpacing() {
  const cards = [
    {
      imageSrc: "/images/school.png",
      title: "We explore, analyze and support",
      description:
        "We explore, analyze and support technology—on-premises and in the startups and —all in one view.",
    },
    {
      imageSrc: "/images/team.png",
      title: "Transform sparks of new technology",
      description:
        "Transform sparks of new technology into stunning efforts and share them with colleagues and students with peers.",
    },
    {
      imageSrc: "/images/explor.png",
      title: "Collaborate on Tech dominion",
      description:
        "Collaborate on Tech dominion and share among peers the benefits and resources.",
    },
    {
      imageSrc: "/images/tansform.png",
      title: "Scale technological knowledge",
      description:
        "Scale technological knowledge across our organization with built-in governance and security.",
    },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto py-8">
      <h2 className="text-center text-2xl text-black font-semibold mb-6">
        What does Tinkering Hub do?
      </h2>

      {/* Animated cards for large and medium screens */}
      <div className="hidden ml-2 mr-2 lg:flex md:justify-between md:space-x-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.3 }}
            variants={cardVariants}
            className="flex justify-center w-full"
          >
            <Card
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg w-64 h-60 md:w-56 md:h-64 lg:w-64 lg:h-80"
            >
              <Image
                src={card.imageSrc}
                alt={card.title}
                width={80} // Adjust the width based on the layout
                height={72} // Adjust the height based on the layout
                className="w-20 h-18 mb-4 object-contain"
              />
              <h3 className="text-lg font-medium mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 overflow-hidden text-ellipsis">
                {card.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Carousel for small and medium screens */}
      <Carousel
        opts={{
          align: "center",
          loop: true,
          gap: "1rem",
          dragFree: false,
          autoplay: {
            delay: 3000,
            pauseOnHover: true,
          },
        }}
        className="block lg:hidden w-full relative"
      >
        <CarouselContent className="flex items-center">
          {cards.map((card, index) => (
            <CarouselItem key={index} className="flex-none w-full p-4">
              <Card className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg h-64">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={64} // Adjust the width based on the layout
                  height={64} // Adjust the height based on the layout
                  className="w-16 h-16 mb-4 object-contain"
                />
                <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 overflow-hidden text-ellipsis">
                  {card.description}
                </p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2">
          ‹
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2">
          ›
        </CarouselNext>
      </Carousel>
    </div>
  );
}
