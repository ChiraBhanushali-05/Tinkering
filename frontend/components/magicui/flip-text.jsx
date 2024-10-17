import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

export default function SlightFlip({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className
}) {
  // Ref for the element
  const ref = useRef(null);

  // Use the inView hook to trigger the animation on scroll
  const isInView = useInView(ref, { once: true }); // Set `once: true` to trigger animation only once when it enters the viewport

  return (
    <div ref={ref} className="flex justify-center space-x-2">
      <AnimatePresence mode="wait">
        {isInView && // Only animate if the component is in view
          word.split("").map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={framerProps}
              transition={{ duration, delay: i * delayMultiple }}
              className={cn(
                "origin-center drop-shadow-sm font-calibri", // Added "font-sans" as a fallback
                className,
                "font-calibri"
              )} // Ensure your font family is applied here
            >
              {char}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
