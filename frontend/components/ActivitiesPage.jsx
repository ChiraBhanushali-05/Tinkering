"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion"
import SlightFlip from "../components/magicui/flip-text"

// Reusable Card Component
const ActivityCard = ({ title, description, items, itemColors, images, color }) => {
  return (
    <div
      className={`rounded-3xl shadow-lg p-8 flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8`}
      style={{ backgroundColor: color, width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div className="flex-1">
        <h3 className="mt-9 text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-2 mb-6">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center px-3 py-2 rounded-full text-gray-800"
              style={{ backgroundColor: itemColors[index] }}
            >
              <span className="mr-2">✔</span> {item}
            </li>
          ))}
        </ul>
        <a href="#" className="inline-flex mt-6 text-black hover:text-indigo-400 font-semibold">
          View Project <span className="ml-2">→</span>
        </a>
      </div>
      <div className="flex-1 flex flex-col space-y-8"> {/* Adjusted spacing between images */}
        {images.map((image, index) => (
          <Image
            key={index}
            className="rounded-lg"
            src={image.src}
            alt={image.alt}
            width={500}
            height={300}
            layout="responsive"
          />
        ))}
      </div>
    </div>
  );
};

// Data for the Cards
const activities = [
  {
    title: "Creating cohorts as technology-based thrust areas Solutionist",
    description:
      "Creating cohorts as technology-based thrust areas involves forming specialized groups focused on key technological domains like AI, IoT, and cybersecurity. These cohorts are designed to foster innovation and collaboration within targeted sectors.",
    items: ["Enhanced Collaboration", "Resource Optimization", "Focused Innovation"],
    itemColors: ["#D6BCFA", "#C4B5FD", "#A78BFA"], // Different background colors for list items
    images: [
      { src: "/images/s1.jpg", alt: "Activity Image 1" },
      { src: "/images/s2.jpg", alt: "Activity Image 2" },
    ],
    color: "#EDE9FE", // Card background color
  },
  {
    title: "Creating pipelines for research & entrepreneurship in consultation with startups and MSME",
    description:
      "Creating pipelines for research and entrepreneurship with startups and MSMEs involves developing pathways to foster innovation and business growth. These pipelines focus on leveraging collaboration for increased resource sharing and support.",
    items: ["Collaborative Ecosystem", "Innovation Support", "Resource Sharing"],
    itemColors: ["#FED7AA", "#FDBA74", "#FB923C"], // Different background colors for list items
    images: [
      { src: "/images/m1.jpg", alt: "Activity Image 3" },
      { src: "/images/m3.jpg", alt: "Activity Image 4" },
    ],
    color: "#FFF4E5", // Card background color
  },
  {
    title: "Mentoring Students for Internal, State, and National Level Hackathons and Coding Challenges",
    description:
      "Mentoring for internal, state, and national coding challenges offers technical support and mentorship. The goal is to enhance coding skills, foster creativity, and apply technical skills to real-world challenges in technology and entrepreneurship.",
    items: ["Strategic Guidance", "Mentorship Sessions", "Technical Support"],
    itemColors: ["#BBF7D0", "#86EFAC", "#4ADE80"], // Different background colors for list items
    images: [
      { src: "/images/j3.jpg", alt: "Activity Image 5" },
      { src: "/images/ji5.jpg", alt: "Activity Image 6" },
    ],
    color: "#ECFDF5", // Card background color
  },
  {
    title: "Advanced Lab Setup in Industry 4.0",
    description:
      "Our advanced lab setup focuses on Industry 4.0 areas, integrating cutting-edge technologies such as IoT, AI, robotics, and data analytics. We create dynamic environments for research and innovation, fostering collaboration between academia and industry. This is aimed at driving technological advancements, optimizing manufacturing, and preparing industries for the future of automation and digital transformation.",
    items: ["Integrated Technologies", "Collaborative Environment", "Research & Development"],
    itemColors: ["#FECACA", "#F87171", "#EF4444"], // Different background colors for list items
    images: [
      { src: "/images/apple1.jpg", alt: "Activity Image 7" },
      { src: "/images/apple2.jpg", alt: "Activity Image 8" },
    ],
    color: "#FEE2E2", // Card background color
  },
];

// Main Page Component
const ActivitiesPage = () => {
  return (
    <div className="container mx-auto px-4 lg:px-12 py-12 bg-primary_color2">
    <SlightFlip 
    word="Explor Activities" 
    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold mb-4" 
  />
  

      <div className="space-y-8">
        {activities.map((activity, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <ActivityCard
              title={activity.title}
              description={activity.description}
              items={activity.items}
              itemColors={activity.itemColors}
              images={activity.images}
              color={activity.color}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
