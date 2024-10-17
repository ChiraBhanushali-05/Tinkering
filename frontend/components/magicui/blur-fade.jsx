"use client";
import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inViewMargin = "-50px",
  blur = "6px"
}) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: false, margin: inViewMargin }); // Set `once: false` for continuous view checking
  const isInView = inViewResult; // Directly use inViewResult

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: `blur(0px)` }, // Adjusted y to 0 for no upward movement
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
