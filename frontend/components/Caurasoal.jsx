'use client'
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export function CarouselSize() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div ref={containerRef} className="relative w-full overflow-hidden bg-primary_color2 rounded-lg">
        {/* Carousel for large screens */}
        <div className="hidden md:block">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              perPage: 5, // Number of items visible at a time
              gap: '1rem', // Gap between items
            }}
            className="w-full py-5"
          >
            <div className="flex justify-center">
              <h1 className="text-black mb-1">Thrust Areas</h1>
            </div>
            <CarouselContent className="flex w-full">
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 basis-1/5 flex justify-center items-center"
                >
                  <div className="p-1">
                    <Card className="w-20 h-20 flex items-center justify-center">
                      <CardContent className="flex items-center bg-primary_color2 justify-center p-2">
                        <img
                          src={`/images/icon${index + 1}.png`}
                          alt={`Icon ${index + 1}`}
                          className="w-16 h-16 object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Positioning arrows */}
            <CarouselPrevious className="absolute text-black left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2" />
            <CarouselNext className="absolute text-black right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2" />
          </Carousel>
        </div>

        {/* Carousel for small screens */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              perPage: 2, // Fewer items visible at a time
              gap: '1rem', // Gap between items
            }}
            className="w-full py-5"
          >
            <div className="flex justify-center">
              <h1 className="text-black mb-1">Thrust Areas</h1>
            </div>
            <CarouselContent className="flex w-full">
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 flex justify-center items-center"
                  style={{
                    width: '50%', // Adjust for smaller screens
                  }}
                >
                  <div className="p-1">
                    <Card className="w-20 h-20 flex items-center justify-center">
                      <CardContent className="flex items-center justify-center p-2">
                        <img
                          src={`/images/icon${index + 1}.png`}
                          alt={`Icon ${index + 1}`}
                          className="w-16 h-16 object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Positioning arrows */}
            <CarouselPrevious className="absolute text-black left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2" />
            <CarouselNext className="absolute text-black right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2" />
          </Carousel>
        </div>
      </div>
    </motion.div>
  );
}
