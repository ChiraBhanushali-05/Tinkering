'use client';
import React from 'react';
import Image from 'next/image'; // Adjust if using Next.js image optimization
import BlurFade from "../components/magicui/blur-fade";

const imageData = [
  { src: '/images/p1.jpg', alt: 'Gallery Image 1', size: 'square' },
  { src: '/images/p2(umang).jpg', alt: 'Gallery Image 2', size: 'rectangle' },
  { src: '/images/p3(vision).jpg', alt: 'Gallery Image 3', size: 'square' },
  { src: '/images/p4(ml).jpg', alt: 'Gallery Image 4', size: 'rectangle' },
  { src: '/images/p5(apple).jpg', alt: 'Gallery Image 5', size: 'square' },
  { src: '/images/p6(team1).jpg', alt: 'Gallery Image 6', size: 'rectangle' },
  { src: '/images/p7(team2).jpg', alt: 'Gallery Image 7', size: 'square' },
  { src: '/images/p8.jpg', alt: 'Gallery Image 8', size: 'rectangle' },
  {src: '/images/p9.jpg', alt: 'Gallery Image 8', size: 'square' },
];

const GallerySection = () => {
  return (
    <div className="mt-8">
      <h2 className="text-4xl text-black font-bold text-center mt-8">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-6 p-8">
        {imageData.map((image, index) => (
          <BlurFade key={index} duration={0.5} delay={index * 0.1}>
            <div className={`relative ${image.size === 'square' ? 'w-80 h-60 aspect-square' : 'w-full h-96'} flex justify-end items-end`}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill" // Use fill for responsive images
                objectFit="cover" // Cover to maintain aspect ratio
                className="rounded-lg"
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;

